import mongoose, { Schema } from "mongoose";
import { Application } from "src/utils/types";

const ApplicationSchema = new Schema<Application>({
  project: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  aboutQ1: String,
  aboutQ2: String,
  aboutQ3: String,
  aboutQ4: String,
  needsQ1: String,
  needsQ2: String,
  needsQ3: String,
  needsQ4: String,
  needsQ5: String,
});

const ApplicationModel =
  (mongoose.models.Application as mongoose.Model<Application>) ||
  mongoose.model<Application>("Application", ApplicationSchema);

export default ApplicationModel;
