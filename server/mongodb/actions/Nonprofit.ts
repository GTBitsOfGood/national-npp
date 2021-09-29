import { Types } from "mongoose";
import NonprofitModel from "server/mongodb/models/Nonprofit";
import dbConnect from "server/utils/dbConnect";
import { NonprofitCreate, NonprofitUpdate } from "src/utils/types";

export async function createNonprofit(nonprofitCreate: NonprofitCreate) {
  await dbConnect();

  const nonprofit = await NonprofitModel.create(nonprofitCreate);

  return nonprofit;
}

export async function updateNonprofit(
  nonprofitId: Types.ObjectId,
  nonprofitUpdate: NonprofitUpdate
) {
  await dbConnect();

  const nonprofit = await NonprofitModel.findByIdAndUpdate(
    nonprofitId,
    nonprofitUpdate,
    { new: true }
  );

  return nonprofit;
}

/* I imagine we need this to prepopulate the data in the nonprofit profile */
export async function getNonprofit(nonprofitId: Types.ObjectId) {
  await dbConnect();
  const nonprofit = await NonprofitModel.find({ _id: nonprofitId });

  return nonprofit;
}
