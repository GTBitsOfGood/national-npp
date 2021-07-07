import { createHash, randomBytes } from "crypto";
import mongoose from "mongoose";
import { Profile } from "next-auth";
import { AdapterInstance } from "next-auth/adapters";
import { AppOptions } from "next-auth/internals";
import { EmailConfig } from "next-auth/providers";
import AccountModel from "server/mongodb/models/Account";
import SessionModel from "server/mongodb/models/Session";
import UserModel from "server/mongodb/models/User";
import VerificationRequestModel from "server/mongodb/models/VerificationRequest";
import dbConnect from "server/utils/dbConnect";
import { User, Session } from "src/utils/types";

/*
    This adapter has not been tested with providers other than email. That is considered future work for now.
*/
const MongoDBAdapter = () => {
  return {
    async getAdapter(
      appOptions: AppOptions
    ): Promise<AdapterInstance<User, Profile, Session>> {
      const { session, secret } = appOptions;

      const sessionMaxAge = session.maxAge * 1000;
      const sessionUpdateAge = session.updateAge * 1000;

      const hashToken = (token: string) =>
        createHash("sha256").update(`${token}${secret}`).digest("hex");

      return {
        displayName: "MongoDB",
        async createUser(profile: Profile) {
          const { email, emailVerified } = profile;

          await dbConnect();

          const newUser = await UserModel.create({
            email,
            emailVerified,
            name: "",
            image: "",
          });

          return newUser;
        },

        async getUser(id: string) {
          await dbConnect();

          const user = await UserModel.findById(id).lean();
          return user;
        },

        async getUserByEmail(email: string) {
          if (!email) return null;

          await dbConnect();

          const user = await UserModel.findOne({ email }).lean();
          return user;
        },

        async getUserByProviderAccountId(
          providerId: string,
          providerAccountId: string
        ) {
          await dbConnect();

          const account = await AccountModel.findOne({
            providerId,
            providerAccountId,
          });

          if (!account) return null;

          const user = await UserModel.findById(account.userId);
          return user;
        },

        async updateUser(user: User) {
          await dbConnect();

          const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            user,
            {
              new: true,
            }
          );

          return updatedUser as User;
        },

        async deleteUser(userId: string) {
          await dbConnect();

          await UserModel.findByIdAndDelete(userId);
        },

        async linkAccount(
          userId: string,
          providerId: string,
          providerType: string,
          providerAccountId: string,
          refreshToken: string,
          accessToken: string,
          accessTokenExpires: null
        ) {
          await dbConnect();

          await AccountModel.create({
            userId,
            providerId,
            providerType,
            providerAccountId,
            refreshToken,
            accessToken,
            accessTokenExpires,
          });
        },

        async unlinkAccount(
          userId: string,
          providerId: string,
          providerAccountId: string
        ) {
          await dbConnect();

          await AccountModel.findOneAndDelete({
            userId: mongoose.Types.ObjectId(userId),
            providerId,
            providerAccountId,
          });
        },

        async createSession(user: User) {
          await dbConnect();

          const newSession = await SessionModel.create({
            userId: user._id,
            expires: new Date(Date.now() + sessionMaxAge),
            sessionToken: randomBytes(32).toString("hex"),
            accessToken: randomBytes(32).toString("hex"),
          });

          return newSession;
        },

        async getSession(sessionToken: string) {
          await dbConnect();

          const session = await SessionModel.findOne({
            sessionToken,
          }).lean();

          if (!session) return null;

          if (session.expires.getTime() < Date.now()) {
            await SessionModel.findByIdAndDelete(session._id);
            return null;
          }

          return session;
        },

        async updateSession(session: Session, force: boolean) {
          if (
            !force &&
            session.expires.getTime() - sessionMaxAge + sessionUpdateAge >
              Date.now()
          ) {
            return null;
          }

          await dbConnect();

          const updatedSession = await SessionModel.findByIdAndUpdate(
            session._id,
            { expires: new Date(Date.now() + sessionMaxAge) },
            { new: true }
          ).lean();

          return updatedSession;
        },

        async deleteSession(sessionToken: string) {
          await dbConnect();

          await SessionModel.findOneAndDelete({ sessionToken });
        },

        async createVerificationRequest(
          identifier: string,
          url: string,
          token: string,
          _: string,
          provider: EmailConfig
        ) {
          const { sendVerificationRequest, maxAge } = provider;

          let expirationDate = null;
          if (maxAge) {
            expirationDate = new Date(Date.now() + maxAge * 1000);
          }

          await dbConnect();

          await VerificationRequestModel.create({
            identifier,
            token: hashToken(token),
            expires: expirationDate,
          });

          await sendVerificationRequest({
            identifier,
            url,
            token,
            baseUrl: appOptions.baseUrl,
            provider,
          });
        },

        async getVerificationRequest(identifier: string, token: string) {
          await dbConnect();

          const verifyRequest = await VerificationRequestModel.findOne({
            identifier,
            token: hashToken(token),
          });

          if (!verifyRequest) return null;

          if (verifyRequest.expires.getTime() < Date.now()) {
            await VerificationRequestModel.findByIdAndDelete(verifyRequest._id);
            return null;
          }

          // Need to return like this because of return type definition
          return {
            id: verifyRequest.id as string,
            identifier: verifyRequest.identifier,
            token: verifyRequest.token,
            expires: verifyRequest.expires,
          };
        },

        async deleteVerificationRequest(identifier: string, token: string) {
          await dbConnect();

          await VerificationRequestModel.findOneAndDelete({
            identifier,
            token: hashToken(token),
          });
        },
      };
    },
  };
};

export default MongoDBAdapter;
