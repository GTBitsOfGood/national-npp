import mongoose, { CallbackError, Schema, Types } from "mongoose";
import AddressSchema from "server/mongodb/models/embedded/Address";
import ProjectModel from "server/mongodb/models/Project";
import UserModel from "server/mongodb/models/User";
import { deleteDocumentAndDependencies } from "server/utils/delete-document";
import { Nonprofit } from "src/utils/types";

const NonprofitSchema = new Schema<Nonprofit>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  website: String,
  mission: String,
});

NonprofitSchema.pre(
  "remove",
  async function (next: (err?: CallbackError) => void) {
    const id = this._id as Types.ObjectId;
    // Cascade deletes
    await Promise.all([
      // delete the user associated with the nonprofit
      deleteDocumentAndDependencies(UserModel, {
        nonprofit: id,
      }),
      // delete the projects associated with the nonprofit
      deleteDocumentAndDependencies(ProjectModel, {
        nonprofit: id,
      }),
    ]);
    next();
  }
);

const NonprofitModel =
  (mongoose.models.Nonprofit as mongoose.Model<Nonprofit>) ||
  mongoose.model<Nonprofit>("Nonprofit", NonprofitSchema);
export default NonprofitModel;
