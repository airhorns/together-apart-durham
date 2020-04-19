import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import sharp from "sharp";
import { encode } from "blurhash";
import { $backend, stripWebflowFunctions, ContentBackend, stripWebflowManagedFields } from "../../lib/backend";

export const blurhashImageURL = async (url: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const { data, info } = await sharp(response.data)
    .resize({ width: 100 })
    .raw()
    .ensureAlpha()
    .toColourspace("rbga")
    .toBuffer({ resolveWithObject: true });
  try {
    return encode(Uint8ClampedArray.from(data), info.width, info.height, 4, 4);
  } catch (e) {
    console.error(e, {
      url,
      status: response.status,
      width: info.width,
      height: info.height,
      wxh: info.width * info.height * 4,
      length: data.length,
    });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let updated = 0;

  await $backend.paginatedItems(async (page) => {
    await Promise.all(
      page.items
        .filter((item) => item["image-field"] && !item["image-blurhash"])
        .map(async (item) => {
          const hash = await blurhashImageURL(item["image-field"].url);
          if (hash) {
            await $backend.$webflow.updateItem({
              fields: { ...stripWebflowFunctions(stripWebflowManagedFields(item)), "image-blurhash": hash },
              collectionId: ContentBackend.BUSINESSES_COLLECTION_ID,
              itemId: item._id,
            });
            updated += 1;
            console.log(`updated item ${item._id}`);
          } else {
            console.log(`skipped item ${item._id}`);
          }
        })
    );
    console.log("processed page");
  });
  console.log("finished", { updated });
  res.status(200).json({ success: true, updated });
};
