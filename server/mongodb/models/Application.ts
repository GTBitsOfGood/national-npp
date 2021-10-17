import mongoose, { Schema } from "mongoose";
import { Application } from "src/utils/types";

const ApplicationSchema = new Schema<Application>({
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
  ein: "12-1234567",
  aboutQ1: "answer B1",
  aboutQ2: "answer B2",
  aboutQ3: "answer B3",
  aboutQ4: "answer B4",
  needsQ1: "answer C1",
  needsQ2: "answer C2",
  needsQ3: "answer C3",
  needsQ4: "answer C4",
  needsQ5: "answer C5",
});

const ApplicationModel =
  (mongoose.models.Project as mongoose.Model<Application>) ||
  mongoose.model<Application>("Application", ApplicationSchema);

export default ApplicationModel;
