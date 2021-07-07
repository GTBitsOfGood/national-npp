import { Schema } from "mongoose";
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

export default NonprofitSchema;
