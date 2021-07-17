import { Types } from "mongoose";
import NonprofitModel from "server/mongodb/models/Nonprofit";
import dbConnect from "server/utils/dbConnect";
import { NonprofitChange } from "src/utils/types";

export async function createNonprofit(nonprofit: NonprofitChange) {
  await dbConnect();

  const newNonprofit = await NonprofitModel.create(nonprofit);

  return newNonprofit;
}

export async function updateNonprofit(
  nonprofitId: Types.ObjectId,
  nonprofit: NonprofitChange
) {
  await dbConnect();

  const updatedNonprofit = await NonprofitModel.findByIdAndUpdate(
    nonprofitId,
    nonprofit,
    { new: true }
  );

  return updatedNonprofit;
}
