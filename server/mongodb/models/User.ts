import mongoose, { Schema } from "mongoose";
import { Role, User } from "src/utils/types";

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
    roles: {
      type: [String],
      required: true,
      enum: Object.values(Role),
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
    nonprofit: {
      type: Schema.Types.ObjectId,
      ref: "Nonprofit",
    },
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
