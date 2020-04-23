import { NextApiRequest, NextApiResponse } from "next";
import { $backend } from "../../lib/backend";
import { hashAll } from "../../lib/hash";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await $backend.prepare();
  await $backend.sync();
  await hashAll();
  res.status(200).json({ success: true });
};
