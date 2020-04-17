import { NextApiRequest, NextApiResponse } from "next";
import { $importer } from "../../lib/content";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await $importer.prepare();
    const stats = await $importer.stats();
    res.status(200).json({ success: true, stats });
  } catch (e) {
    console.log(e.message);
    res.status(422).json({ success: false });
  }
};
