import mongoose, { Schema } from "mongoose";
import AddressSchema from "server/mongodb/models/embedded/Address";
import { Chapter, MaintenanceType } from "src/utils/types";

const ChapterSchema = new Schema<Chapter>({
  name: {
    type: String,
    required: true,
  },
  email: String,
  contact: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  address: AddressSchema,
  website: String,
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
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

const ChapterModel =
  (mongoose.models.Chapter as mongoose.Model<Chapter>) ||
  mongoose.model<Chapter>("Chapter", ChapterSchema);

export default ChapterModel;
