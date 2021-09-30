import mongoose, { Schema } from "mongoose";
import AddressSchema from "server/mongodb/models/embedded/Address";
import MaintenancePeriodSchema from "server/mongodb/models/embedded/MaintenancePeriod";
import { Chapter, MaintenanceType } from "src/utils/types";

const ChapterSchema = new Schema<Chapter>({
  name: {
    type: String,
    required: true,
  },
  email: String,
  contact: String,
  address: AddressSchema,
  website: String,
  facebook: String,
  instagram: String,
  maintenanceEnabled: Boolean,
  maintenanceType: {
    type: [String],
    required: true,
    enum: Object.values(MaintenanceType),
  },
  maintenancePeriod: {
    type: MaintenancePeriodSchema,
    required: true,
  },
});

const ChapterModel =
  (mongoose.models.Chapter as mongoose.Model<Chapter>) ||
  mongoose.model<Chapter>("Chapter", ChapterSchema);

export default ChapterModel;
