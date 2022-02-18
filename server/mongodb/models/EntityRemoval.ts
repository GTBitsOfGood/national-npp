import mongoose, { Schema } from "mongoose";
import { EntityRemoval } from "src/utils/types";
const EntityRemovalSchema = new Schema<EntityRemoval>(
  {
    deletedDocumentId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export const NonprofitRemovalModel =
  (mongoose.models.NonprofitRemoval as mongoose.Model<EntityRemoval>) ||
  mongoose.model<EntityRemoval>("NonprofitRemoval", EntityRemovalSchema);

export const ChapterRemovalModel =
  (mongoose.models.ChapterRemoval as mongoose.Model<EntityRemoval>) ||
  mongoose.model<EntityRemoval>("ChapterRemoval", EntityRemovalSchema);
