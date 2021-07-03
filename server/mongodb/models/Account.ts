import mongoose, { Schema, Types } from "mongoose";

export interface Account {
  _id: Types.ObjectId;
  id: string;
  userId: Types.ObjectId;
  providerId: string;
  providerType: string;
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: null;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<Account>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    providerType: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    accessTokenExpires: {
      type: String,
      required: true,
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

const AccountModel =
  (mongoose.models.Account as mongoose.Model<Account>) ||
  mongoose.model<Account>("Account", AccountSchema);
export default AccountModel;
