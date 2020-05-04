import Webflow from "webflow-api";
import algoliasearch, { SearchIndex } from "algoliasearch";
import { assert } from "./utils";
import { keyBy, pick, omit, compact, uniq, filter } from "lodash-es";
import { CurrentSite } from "./sites";

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
  static LANDING_PAGES_ID = "5ea73261e4a40c52814d02cc";

  $webflow = new Webflow({ token: assert(process.env.WEBFLOW_API_KEY, "WEBFLOW_API_KEY environment variable must be set") });
  $algolia = algoliasearch(
    assert(process.env.ALGOLIA_APP_ID, "ALGOLIA_APP_ID environment variable must be set"),
    assert(process.env.ALGOLIA_API_KEY, "ALGOLIA_API_KEY environment variable must be set")
  );
  $index: SearchIndex;
  allLocations: { [key: string]: WebflowItem } = {};
  currentSiteLocations: { [key: string]: WebflowItem } = {};
  landingPages: { [key: string]: WebflowItem } = {};
  categories: { [key: string]: WebflowItem } = {};
  preparePromise: Promise<void> | null = null;
  prepared = false;

  constructor() {
    this.$index = this.$algolia.initIndex("prod_businesses");
  }

  async prepare() {
    if (this.prepared) {
      return true;
    }
    if (this.preparePromise) {
      return await this.preparePromise;
    }

    this.preparePromise = (async () => {
      this.allLocations = keyBy(
        (
          await this.$webflow.items({
            collectionId: ContentBackend.LOCATIONS_COLLECTION_ID,
          })
        ).items.map(stripWebflowFunctions),
        "_id"
      );

      this.currentSiteLocations = keyBy(filter(this.allLocations, this.partOfCurrentSite), "_id");

      this.categories = keyBy(
        (
          await this.$webflow.items({
            collectionId: ContentBackend.CATEGORIES_COLLECTION_ID,
          })
        ).items.map(stripWebflowFunctions),
        "_id"
      );

      this.landingPages = keyBy(
        (
          await this.$webflow.items({
            collectionId: ContentBackend.LANDING_PAGES_ID,
          })
        ).items
          .filter(this.partOfCurrentSite)
          .map(stripWebflowFunctions),
        "_id"
      );

      this.prepared = true;
    })();

    return await this.preparePromise;
  }

  // Syncs all items from webflow into Algolia
  // Note: not site specific, we just do one big sync then filter down to the site we need on the frontend
  async sync() {
    await this.prepare();
    const result: { saved: Record<string, boolean>; totalSaved: number } = { saved: {}, totalSaved: 0 };

    await this.paginatedItems(async (page) => {
      const objects: Record<string, any>[] = [];
      page.items.forEach((item) => {
        if (this.readyForPublish(item)) {
          objects.push(this.formatWebflowForAlgolia(item));
          result.saved[item.name] = true;
        } else {
          result.saved[item.name] = false;
        }
      });

      const saveResponse = await this.$index.saveObjects(objects);
      result.totalSaved += saveResponse.objectIDs.length;
      console.log(`saved result batch, size=${saveResponse.objectIDs.length}`);
    });

    console.log("sync complete", { totalSaved: result.totalSaved });
    return result;
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
      "website",
      "phone-number",
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
    ret.landingPageOnly = !!item["landing-pages-only"];
    ret["header_image"] = item["image-field"]["url"];
    ret.pickup = item["takeout"] || item["curbside"];
    ret.tags = (item["tags"] || "").split(",").filter((tag: string) => tag != "");
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
    return this.allLocations[item["location-2"]] ? this.allLocations[item["location-2"]].name : null;
  }

  categoryNameForItem(item: WebflowItem) {
    return this.categories[item["category"]] ? this.categories[item["category"]].name : null;
  }

  partOfCurrentSite(item: WebflowItem) {
    return item["site"] == CurrentSite.webflowID;
  }
}

export const $backend = new ContentBackend();
