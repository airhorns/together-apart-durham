import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("submit form", req.body);
  try {
    await axios.post("https://hook.integromat.com/2vd9cesc0ffsi9t7yaid94fenygkxbpz", req.body);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.status(422).json({ success: false });
  }
};
