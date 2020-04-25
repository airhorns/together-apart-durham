import { NextApiRequest, NextApiResponse } from "next";
import { $backend } from "../../lib/backend";
import { hashAll } from "../../lib/hash";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result: Record<string, any> = {};
  await $backend.prepare();
  result.stats = await $backend.sync();
  result.hashing = await hashAll();
  res.status(200).json({ success: true, ...result });
};
