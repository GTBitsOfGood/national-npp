import mongoose, { Schema } from "mongoose";
import { Account } from "src/utils/types";

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
