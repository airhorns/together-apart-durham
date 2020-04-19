import { NextApiRequest, NextApiResponse } from "next";
import { $backend } from "../../lib/backend";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await $backend.prepare();
  await $backend.sync();
  res.status(200).json({ success: true });
};
