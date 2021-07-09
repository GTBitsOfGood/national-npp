import { Schema } from "mongoose";
import { Address } from "src/utils/types";

const AddressSchema = new Schema<Address>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

export default AddressSchema;
