import Webflow from "webflow-api";
import algoliasearch, { SearchIndex } from "algoliasearch";
import dotenv from "dotenv";
import { assert } from "./utils";
import { keyBy, pick } from "lodash-es";
dotenv.config();

interface WebflowItem {
  _id: string;
  [key: string]: any;
}

export class Importer {
  static BUSINESSES_COLLECTION_ID = "5e7a88e0ded784db2c263c6a";
  static LOCATIONS_COLLECTION_ID = "5e7a88e0ded78464ab263c6c";
  static CATEGORIES_COLLECTION_ID = "5e7a88e0ded784470a263c6b";
  static HOURS: Record<string, string> = {
    "1c4b59d310214e49df144a53ed5e38f4": "online_only",
    "20cec4537d84de98052a01fec776854e": "limited",
    "750a7ce8734c09d07559d16bfe505b9d": "regular",
  };

  $webflow = new Webflow({ token: assert(process.env.WEBFLOW_API_KEY) });
  $algolia = algoliasearch(
    assert(process.env.ALGOLIA_APP_ID),
    assert(process.env.ALGOLIA_API_KEY)
  );
  $index: SearchIndex;
  locations: { [key: string]: any } = null as any;
  categories: { [key: string]: any } = null as any;
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
          collectionId: Importer.LOCATIONS_COLLECTION_ID,
        })
      ).items,
      "_id"
    );
    this.categories = keyBy(
      (
        await this.$webflow.items({
          collectionId: Importer.CATEGORIES_COLLECTION_ID,
        })
      ).items,
      "_id"
    );
    this.prepared = true;
    return this.prepared;
  }

  async sync() {
    await this.prepare();

    let nextPage = true,
      offset = 0,
      totalSaved = 0;
    const pageSize = 100;

    while (nextPage) {
      const page: {
        items: WebflowItem[];
        count: number;
        offset: number;
        total: number;
      } = await this.$webflow.items(
        { collectionId: Importer.BUSINESSES_COLLECTION_ID },
        { limit: pageSize, offset }
      );
      console.log(`fetched page offset=${page.offset} total=${page.total}`);

      offset += pageSize;
      if (page.items.length < pageSize) {
        nextPage = false;
      }

      const objects = page.items
        .filter(
          (item) =>
            item["_draft"] == false &&
            item["_archived"] == false &&
            item["image-field"]
        )
        .map((item) => this.formatWebflowForAlgolia(item));

      const saveResponse = await this.$index.saveObjects(objects);
      totalSaved += saveResponse.objectIDs.length;
      console.log(`saved result batch, size=${saveResponse.objectIDs.length}`);
    }

    return totalSaved;
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
      "online-store-link",
      "donations-link",
      "name",
      "story",
      "special-instructions",
      "slug",
      "updated-on",
      "published-on",
    ]);

    ret.objectID = item["_id"];
    ret.location = this.locations[item["location-2"]]
      ? this.locations[item["location-2"]].name
      : null;
    ret.category = this.categories[item["category"]]
      ? this.categories[item["category"]].name
      : null;
    ret.hours = Importer.HOURS[item["status"]];
    ret["header_image"] = item["image-field"]["url"];

    return ret;
  }
}

export const $importer = new Importer();
