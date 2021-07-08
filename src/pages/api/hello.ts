import { Types } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { InternalResponse } from "src/utils/types";
// import { getChapterUserProfile } from "../../../server/mongodb/actions/User";
interface Data {
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InternalResponse<Data>>
) {
  /*
  getChapterUserProfile(Types.ObjectId("60db9ac9c2e44048a7832a3c")).then(
    (user) => {
      console.log(user);
      res.status(200).json({ success: true, payload: user });
    });
    */
  res.status(200).json({ success: true, payload: { name: "Matt" } });
}
