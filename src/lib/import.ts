import fs from "fs";
import CsvReadableStream from "csv-reader";
import Queue from "promise-queue";

import { NextApiRequest, NextApiResponse } from "next";
import { $backend, ContentBackend } from "./backend";
import { mapValues, keyBy, values, uniq } from "lodash-es";
import { CurrentSite } from "./sites";

export const importer = async (req: NextApiRequest, res: NextApiResponse) => {
  const inputStream = fs.createReadStream("/Users/airhorns/Downloads/durham_for_durham_-_businesses.csv", "utf8");
  await $backend.prepare();

  const items: Record<string, any>[] = [];
  const rows: any[] = [];
  const locationsLookup = keyBy(values($backend.allLocations), (location) => location.name.toLowerCase());
  const categoriesLookup = keyBy(values($backend.categories), (category) => category.name.toLowerCase());

  inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject: true }))
    .on("data", (row: Record<string, any>) => {
      rows.push(row);
      const item: Record<string, any> = {
        _archived: false,
        _draft: row["Published On"] == "",
        grubhub: !!row["GrubHub"],
        takeout: !!row["Takeout?"],
        website: row["Website"],
        "phone-number": row["Phone Number"],
        curbside: row["Curbside?"],
        delivery: row["Delivery?"],
        seamless: false,
        "door-dash": row["Door Dash"],
        postmates: false,
        "uber-eats": row["Uber Eats"],
        "facebook-page": null,
        "gift-card-link": row["Gift Card Link"],
        "instagram-profile": null,
        "twitter-profile": null,
        "online-order-link": row["Online Order Food Link"],
        "order-groceries-link": null,
        "online-store-link": null,
        "donations-link": null,
        name: row["Name"],
        story: row["Special Instructions"],
        "special-instructions": null,
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

  console.log();
  const nullKeys = Object.keys(items[0]).filter((key) => items.every((item) => !item[key]));
  const queue = new Queue(8, 1000);
  const errors: any[] = [];
  // console.log("creating items", { length: items.length });

  // await Promise.all(
  //   items.map(async (item) => {
  //     await queue.add(async () => {
  //       try {
  //         const resp = await $backend.$webflow.createItem({ collectionId: ContentBackend.BUSINESSES_COLLECTION_ID, fields: item });
  //         console.log("success", { name: item.name });
  //       } catch (e) {
  //         errors.push({ errors: e, item });
  //       }
  //     });
  //   })
  // );

  const getUnique = (key: string) => uniq(rows.map((row) => row[key]));
  await res
    .status(200)
    .json({ success: true, errors, nullKeys, locations: getUnique("Location"), orderOptions: getUnique("Order Options") });
};
