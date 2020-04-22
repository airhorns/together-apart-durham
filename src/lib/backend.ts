import Webflow from "webflow-api";
import algoliasearch, { SearchIndex } from "algoliasearch";
import { assert } from "./utils";
import { keyBy, pick, omit, compact, uniq } from "lodash-es";

if (typeof window != "undefined") {
  throw "Build error: backend being required on frontend";
}

interface WebflowItem {
  _id: string;
  name: string;
  [key: string]: any;
}

interface WebflowItemsPage {
  items: WebflowItem[];
  count: number;
  offset: number;
  total: number;
}

export const stripWebflowFunctions = (item: { [key: string]: any }) => omit(item, ["update", "remove"]);
export const stripWebflowManagedFields = (item: { [key: string]: any }) =>
  omit(item, ["_id", "updated-on", "updated-by", "created-on", "created-by", "published-on", "published-by"]);

export class ContentBackend {
  static BUSINESSES_COLLECTION_ID = "5e7a88e0ded784db2c263c6a";
  static LOCATIONS_COLLECTION_ID = "5e7a88e0ded78464ab263c6c";
  static CATEGORIES_COLLECTION_ID = "5e7a88e0ded784470a263c6b";
  static HOURS: Record<string, string> = {
    "1c4b59d310214e49df144a53ed5e38f4": "online_only",
    "20cec4537d84de98052a01fec776854e": "limited",
    "750a7ce8734c09d07559d16bfe505b9d": "regular",
  };

  $webflow = new Webflow({ token: assert(process.env.WEBFLOW_API_KEY) });
  $algolia = algoliasearch(assert(process.env.ALGOLIA_APP_ID), assert(process.env.ALGOLIA_API_KEY));
  $index: SearchIndex;
  locations: { [key: string]: WebflowItem } = null as any;
  categories: { [key: string]: WebflowItem } = null as any;
  prepared = false;

  constructor() {
    this.$index = this.$algolia.initIndex("prod_businesses");
  }

  async prepare() {
    if (this.prepared) {
      return true;
    }
    this.locations = keyBy(
      (
        await this.$webflow.items({
          collectionId: ContentBackend.LOCATIONS_COLLECTION_ID,
        })
      ).items.map(stripWebflowFunctions),
      "_id"
    );
    this.categories = keyBy(
      (
        await this.$webflow.items({
          collectionId: ContentBackend.CATEGORIES_COLLECTION_ID,
        })
      ).items.map(stripWebflowFunctions),
      "_id"
    );
    this.prepared = true;
    return this.prepared;
  }

  async sync() {
    await this.prepare();
    let totalSaved = 0;

    await this.paginatedItems(async (page) => {
      const objects = page.items.filter(this.readyForPublish).map((item) => this.formatWebflowForAlgolia(item));

      const saveResponse = await this.$index.saveObjects(objects);
      totalSaved += saveResponse.objectIDs.length;
      console.log(`saved result batch, size=${saveResponse.objectIDs.length}`);
    });

    console.log("sync complete", { totalSaved });
    return totalSaved;
  }

  async paginatedItems(callback: (page: WebflowItemsPage) => Promise<void>) {
    let nextPage = true,
      offset = 0;
    const pageSize = 100;

    while (nextPage) {
      const page: WebflowItemsPage = await this.$webflow.items(
        { collectionId: ContentBackend.BUSINESSES_COLLECTION_ID },
        { limit: pageSize, offset }
      );
      console.log(`fetched page offset=${page.offset} total=${page.total}`);

      offset += pageSize;
      if (page.items.length < pageSize) {
        nextPage = false;
      }

      await callback(page);
    }
  }

  readyForPublish(item: WebflowItem) {
    return item["_draft"] == false && item["_archived"] == false && item["image-field"];
  }

  formatWebflowForAlgolia(item: WebflowItem) {
    const ret: Record<string, any> = pick(item, [
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
      "order-groceries-link",
      "online-store-link",
      "donations-link",
      "name",
      "story",
      "special-instructions",
      "slug",
      "image-blurhash",
      "site",
      "updated-on",
      "published-on",
    ]);

    ret.objectID = item["_id"];
    ret.location = this.locationNameForItem(item);
    ret.hours = ContentBackend.HOURS[item["status"]];
    ret["header_image"] = item["image-field"]["url"];
    ret.pickup = ret["delivery"] || ret["curbside"];
    ret.randomPriority = Math.random();

    const categories = [this.categoryNameForItem(item)];
    // Restaurants who sell groceries should also be in the groceries category
    if (!!item["order-groceries-link"]) {
      categories.push("Grocery");
    }

    ret.category = uniq(compact(categories));

    return ret;
  }

  locationNameForItem(item: WebflowItem) {
    return this.locations[item["location-2"]] ? this.locations[item["location-2"]].name : null;
  }

  categoryNameForItem(item: WebflowItem) {
    return this.categories[item["category"]] ? this.categories[item["category"]].name : null;
  }
}

export const $backend = new ContentBackend();
