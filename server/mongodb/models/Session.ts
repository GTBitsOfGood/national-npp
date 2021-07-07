import mongoose, { Schema } from "mongoose";
import { Session } from "src/utils/types";

const SessionSchema = new Schema<Session>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    sessionToken: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
  },
  { timestamps: true }
);

const SessionModel =
  (mongoose.models.Session as mongoose.Model<Session>) ||
  mongoose.model<Session>("Session", SessionSchema);

export default SessionModel;
