import fs from "fs";
import CsvReadableStream from "csv-reader";
import Queue from "promise-queue";

import { NextApiRequest, NextApiResponse } from "next";
import { $backend, ContentBackend } from "./backend";
import { mapValues, keyBy, values } from "lodash-es";
import { CurrentSite } from "./sites";

export const importer = async (req: NextApiRequest, res: NextApiResponse) => {
  const inputStream = fs.createReadStream("/Users/airhorns/Downloads/Outaouais Together Apart - Businesses (2).csv", "utf8");
  await $backend.prepare();

  const items: Record<string, any>[] = [];
  const locationsLookup = keyBy(values($backend.allLocations), (location) => location.name.toLowerCase());
  const categoriesLookup = keyBy(values($backend.categories), (category) => category.name.toLowerCase());

  inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject: true }))
    .on("data", (row: Record<string, any>) => {
      const item: Record<string, any> = {
        _archived: false,
        _draft: row["Published On"] == "",
        grubhub: !!row["GrubHub"],
        takeout: !!row["Takeout?"],
        website: row["Website"],
        "phone-number": row["Phone Number"],
        curbside: row["Curbside?"],
        delivery: row["Delivery?"],
        seamless: row["Foodora"],
        "door-dash": row["Door Dash"],
        postmates: row["Skip the Dishes"],
        "uber-eats": row["Uber Eats"],
        "facebook-page": row["Facebook Page"],
        "gift-card-link": row["Gift Card Link"],
        "instagram-profile": row["Instagram Profile"],
        "twitter-profile": row["Twitter Profile"],
        "online-order-link": row["Online Order Food Link"],
        "order-groceries-link": null,
        "online-store-link": row["Online Store Link"],
        "donations-link": row["Donations Link"],
        name: row["Name"],
        story: row["Short Description"],
        "special-instructions": row["Special Instructions"],
        "image-field": row["Image Field"],
        slug: row["Slug"],
        site: CurrentSite.webflowID,
      };

      item["category"] = categoriesLookup[row["Category"]]?._id;
      item["location-2"] = locationsLookup[row["Location"]]?._id;

      items.push(mapValues(item, (value) => (value === "" ? null : value)));
    });

  const end = new Promise(function (resolve, reject) {
    inputStream.on("end", resolve);
    inputStream.on("error", reject);
  });

  await end;

  const nullKeys = Object.keys(items[0]).filter((key) => items.every((item) => !item[key]));
  const queue = new Queue(8, 1000);
  const errors: any[] = [];
  console.log("creating items", { length: items.length });

  await Promise.all(
    items.map(async (item) => {
      await queue.add(async () => {
        try {
          const resp = await $backend.$webflow.createItem({ collectionId: ContentBackend.BUSINESSES_COLLECTION_ID, fields: item });
          console.log("success", { name: item.name });
        } catch (e) {
          errors.push({ errors: e, item });
        }
      });
    })
  );

  await res.status(200).json({ success: true, errors, nullKeys });
};
