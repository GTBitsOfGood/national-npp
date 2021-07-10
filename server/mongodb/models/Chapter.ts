import mongoose, { Schema } from "mongoose";
import AddressSchema from "server/mongodb/models/embedded/Address";
import { Chapter, NonprofitStage, ProjectType } from "src/utils/types";

const ChapterSchema = new Schema<Chapter>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: AddressSchema,
  calendly: String,
  projectProcess: {
    type: [String],
    required: true,
    enum: Object.values(NonprofitStage),
  },
  projectTypes: {
    type: [String],
    required: true,
    enum: Object.values(ProjectType),
  },
  projectLimit: {
    type: Number,
    required: true,
  },
  website: String,
  facebook: String,
  instagram: String,
});

const ChapterModel =
  mongoose.models.Chapter || mongoose.model<Chapter>("Chapter", ChapterSchema);

export default ChapterModel;
