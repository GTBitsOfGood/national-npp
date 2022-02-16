import mongoose, { CallbackError, Schema, Types } from "mongoose";
import AccountModel from "server/mongodb/models/Account";
import SessionModel from "server/mongodb/models/Session";
import { deleteDocumentAndDependencies } from "server/utils/delete-document";
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
    name: {
      type: String,
      required: true,
    },
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

UserSchema.pre("remove", async function (next: (err?: CallbackError) => void) {
  const id = this._id as Types.ObjectId;
  // Cascade deletes
  await Promise.all([
    // delete the user associated with the nonprofit
    deleteDocumentAndDependencies(AccountModel, {
      userId: id,
    }),
    // delete the projects associated with the nonprofit
    deleteDocumentAndDependencies(SessionModel, {
      userId: id,
    }),
  ]);
  next();
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;
