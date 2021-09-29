import { Schema } from "mongoose";
import { Contact } from "src/utils/types";

const ContactSchema = new Schema<Contact>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
});

export default ContactSchema;
