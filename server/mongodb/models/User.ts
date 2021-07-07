import mongoose, { Schema } from "mongoose";
import NonprofitSchema from "server/mongodb/models/embedded/Nonprofit";
import { User } from "src/utils/types";

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Date,
      required: true,
    },
    name: String,
    image: String,
    phoneNum: String,
    calendly: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
    nonprofit: NonprofitSchema,
    createdAt: {
      type: Date,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;
