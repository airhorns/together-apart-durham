require "dotenv/load"
require "csv"
require "webflow"
require "byebug"
require "active_support/all"
require "phonelib"
require "json"
require "algoliasearch"

BUSINESSES_COLLECTION_ID = "5e7a88e0ded784db2c263c6a"
LOCATIONS_COLLECTION_ID = "5e7a88e0ded78464ab263c6c"
CATEGORIES_COLLECTION_ID = "5e7a88e0ded784470a263c6b"

class Sync
  HOURS = {
    online_only: "1c4b59d310214e49df144a53ed5e38f4",
    limited: "20cec4537d84de98052a01fec776854e",
    regular: "750a7ce8734c09d07559d16bfe505b9d",
  }

  attr_reader :webflow, :algolia, :index

  def initialize
    @webflow = Webflow::Client.new(ENV.fetch("WEBFLOW_API_KEY"))
    @algolia = Algolia::Client.new(application_id: ENV.fetch("ALGOLIA_APP_ID"), api_key: ENV.fetch("ALGOLIA_API_KEY"))
    @index = index = @algolia.init_index("prod_businesses")
    @dry_run = !ENV["DRY_RUN"].nil?
    @updated = 0
  end

  def cache_lookups!
    File.open(File.join(__dir__, "locations.json"), "w") do |file|
      file.write(JSON.dump(@webflow.items(LOCATIONS_COLLECTION_ID)))
    end
    puts "Dumped locations"
    File.open(File.join(__dir__, "categories.json"), "w") do |file|
      file.write(JSON.dump(@webflow.items(CATEGORIES_COLLECTION_ID)))
    end
    puts "Dumped categories"
  end

  def prepare
    locations_path = File.join(__dir__, "locations.json")
    if !File.exist?(locations_path)
      cache_lookups!
    end
    @locations = JSON.parse(File.read(locations_path)).index_by { |location| location["_id"] }
    @categories = JSON.parse(File.read(File.join(__dir__, "categories.json"))).index_by { |category| category["_id"] }
  end

  def sync
    prepare

    businesses = @webflow.items(BUSINESSES_COLLECTION_ID, limit: 1000)
    puts "Prepared for import"
    businesses.filter { |b| b["_draft"] == false && b["_archived"] == false && b["image-field"] }.each_slice(100) do |slice|
      resp = @index.add_objects(slice.map do |business|
        ret = business.slice(
          "grubhub",
          "takeout",
          "website",
          "phone-number",
          "curbside",
          "delivery",
          "seamless",
          "_archived",
          "door-dash",
          "postmates",
          "uber-eats",
          "facebook-page",
          "gift-card-link",
          "instagram-profile",
          "twitter-profile",
          "online-order-link",
          "online-store-link",
          "donations-link",
          "name",
          "story",
          "special-instructions",
          "slug",
          "updated-on",
          "published-on",
        )
        ret[:objectID] = business["_id"]
        ret[:location] = @locations[business["location-2"]].try(:[], "name")
        ret[:category] = @categories[business["category"]].try(:[], "name")
        ret[:hours] = HOURS.key(business["status"]).to_s
        ret[:header_image] = business["image-field"]["url"]
        ret
      end)
      @updated += resp["objectIDs"].size
    end
    puts "Done, updated: #{@updated}"
  end
end

if __FILE__ == $0
  Sync.new.sync
end
