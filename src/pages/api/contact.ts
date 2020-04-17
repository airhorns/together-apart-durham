import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await axios.post("https://hook.integromat.com/m6cnt6yrtqtjbkl9itdkrknanhruqlld", req.body);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.status(422).json({ success: false });
  }
};
