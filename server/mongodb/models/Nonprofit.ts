import mongoose, { Schema } from "mongoose";
import AddressSchema from "server/mongodb/models/embedded/Address";
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  website: String,
  mission: String,
});

const NonprofitModel =
  (mongoose.models.Nonprofit as mongoose.Model<Nonprofit>) ||
  mongoose.model<Nonprofit>("Nonprofit", NonprofitSchema);
export default NonprofitModel;
