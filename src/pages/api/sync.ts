import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { $backend } from "../../lib/backend";
import { hashAll } from "../../lib/hash";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await $backend.prepare();
  const result = {
    success: true,
    stats: await $backend.sync(),
    hashing: await hashAll(),
  };

  await axios.post("https://hook.integromat.com/e7xsv6uzbi0025hoyxh3w8f9v24yv5ua", result);
  res.status(200).json(result);
};
