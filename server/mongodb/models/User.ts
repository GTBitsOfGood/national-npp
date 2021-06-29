import mongoose, { Schema, Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  id: string;
  email: string;
  emailVerified: Date;
  name?: string;
  image?: string;
  isAdmin?: boolean;
  chapter?: string;
  nonprofit?: string;
  createdAt: Date;
  updatedAt: Date;
}

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
    isAdmin: Boolean,
    chapter: String,
    nonprofit: String,
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
