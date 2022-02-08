import { Types } from "mongoose";
import NonprofitModel from "server/mongodb/models/Nonprofit";
import dbConnect from "server/utils/dbConnect";
import {
  NonprofitCreateNonprofit,
  NonprofitUpdateNonprofit,
} from "src/utils/types";

export async function nonprofitCreateNonprofit(
  nonprofitCreate: NonprofitCreateNonprofit
) {
  await dbConnect();

  const nonprofit = await NonprofitModel.create(nonprofitCreate);

  return nonprofit;
}

export async function nonprofitUpdateNonprofit(
  nonprofitId: Types.ObjectId,
  nonprofitUpdate: NonprofitUpdateNonprofit
) {
  await dbConnect();

  const nonprofit = await NonprofitModel.findByIdAndUpdate(
    nonprofitId,
    nonprofitUpdate,
    { new: true }
  );

  return nonprofit;
}