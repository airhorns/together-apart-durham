import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("submit change request form", req.body);
  try {
    await axios.post("https://hook.integromat.com/bwkhh0yaorvjw5hb2x7pc1dl309xulw6", req.body);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.status(422).json({ success: false });
  }
};
