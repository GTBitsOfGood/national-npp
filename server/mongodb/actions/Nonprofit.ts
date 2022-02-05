import { Types } from "mongoose";
import { NonprofitRemovalModel } from "server/mongodb/models/EntityRemoval";
import NonprofitModel from "server/mongodb/models/Nonprofit";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { deleteDocumentAndDependencies } from "server/utils/delete-document";
import {
  AdminDeleteNonprofit,
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

export async function adminGetNonprofit(nonprofitId: Types.ObjectId) {
  await dbConnect();

  const nonprofit = await NonprofitModel.findById(nonprofitId).populate({
    path: "contact",
    model: UserModel,
  });

  return nonprofit;
}

export async function adminDeleteNonprofit(
  deleteNonprofitReq: AdminDeleteNonprofit
) {
  await dbConnect();
  if (
    (await deleteDocumentAndDependencies(NonprofitModel, {
      _id: deleteNonprofitReq.deletedDocumentId,
    })) == 0
  ) {
    throw new Error("Nonprofit does not exist");
  }
  await NonprofitRemovalModel.create(deleteNonprofitReq);
}
