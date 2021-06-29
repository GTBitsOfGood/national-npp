import mongoose, { Schema, Types } from "mongoose";

export interface Session {
  _id: Types.ObjectId;
  id: string;
  userId: Types.ObjectId;
  expires: Date;
  sessionToken: string;
  accessToken: string;
}

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
