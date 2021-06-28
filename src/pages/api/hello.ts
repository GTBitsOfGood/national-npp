import type { NextApiRequest, NextApiResponse } from "next";
import { InternalResponse } from "src/utils/types";

interface Data {
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InternalResponse<Data>>
) {
  res.status(200).json({ success: true, payload: { name: "Matt" } });
}
