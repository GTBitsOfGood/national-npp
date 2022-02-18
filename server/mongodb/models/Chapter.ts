import mongoose, { CallbackError, Schema, Types } from "mongoose";
import AddressSchema from "server/mongodb/models/embedded/Address";
import ProjectModel from "server/mongodb/models/Project";
import UserModel from "server/mongodb/models/User";
import { deleteDocumentAndDependencies } from "server/utils/delete-document";
import { Chapter, MaintenanceType } from "src/utils/types";

const ChapterSchema = new Schema<Chapter>({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  website: String,
  facebook: String,
  instagram: String,
  maintenanceTypes: {
    type: [String],
    required: true,
    enum: Object.values(MaintenanceType),
  },
  maintenancePeriod: {
    type: Number,
    required: true,
  },
});

ChapterSchema.pre(
  "remove",
  async function (next: (err?: CallbackError) => void) {
    const id = this._id as Types.ObjectId;
    // Cascade deletes (and remove chapter from projects)
    await Promise.all([
      // delete the user associated with the nonprofit
      deleteDocumentAndDependencies(UserModel, {
        chapter: id,
      }),
      // Remove chapter from projects
      ProjectModel.updateMany({ chapter: id }, { chapter: undefined }),
    ]);
    next();
  }
);

const ChapterModel =
  (mongoose.models.Chapter as mongoose.Model<Chapter>) ||
  mongoose.model<Chapter>("Chapter", ChapterSchema);

export default ChapterModel;
