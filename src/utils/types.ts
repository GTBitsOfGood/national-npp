import { Types } from "mongoose";
import { NextApiRequest } from "next-auth/internals/utils";

/* 
    Only define types used in multiple files here. Keep single file types like
    prop interfaces in their respective files.
*/

/* Models */

export interface User {
  _id: Types.ObjectId;
  id: string;
  email: string;
  emailVerified: Date;
  name?: string;
  image?: string;
  phoneNum?: string;
  calendly?: string;
  roles: Array<Role>;
  chapter?: Chapter | Types.ObjectId;
  nonprofit?: Nonprofit | Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  _id: Types.ObjectId | string;
  name: string;
  email: string;
  address: Address;
  calendly?: string;
  projectProcess: Array<NonprofitStage>;
  projectTypes: Array<ProjectType>;
  projectLimit: number;
  website?: string;
  facebook?: string;
  instagram?: string;
}

export interface Nonprofit {
  _id: Types.ObjectId;
  name: string;
  address: Address;
  isVerified: boolean;
  contact: string;
  website?: string;
  mission?: string;
}

export interface Project {
  _id: Types.ObjectId;
  chapter: Chapter | Types.ObjectId;
  nonprofit: Nonprofit | Types.ObjectId;
  name: string;
  status: ChapterStage;
  type?: ProjectType;
  contact?: User | Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Session {
  _id: Types.ObjectId;
  id: string;
  userId: Types.ObjectId;
  expires: Date;
  sessionToken: string;
  accessToken: string;
}

export interface SessionUser {
  id: Types.ObjectId;
  email: string;
  name: string;
  image: string;
  roles: Array<Role>;
  chapter?: Types.ObjectId;
  nonprofit?: Types.ObjectId;
}

export interface VerificationRequest {
  _id: Types.ObjectId;
  id: string;
  identifier: string;
  token: string;
  expires: Date;
}

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

/* Request/Response */

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface InternalRequest extends NextApiRequest {
  user: SessionUser;
  body: { [key: string]: unknown };
}

export interface InternalRequestData {
  url: string;
  method: HttpMethod;
  body?: { [key: string]: unknown };
}

export interface InternalResponseData<T> {
  success: boolean;
  message?: string;
  payload?: T;
}

export type ProjectCreate = Pick<
  Required<Project>,
  "chapter" | "name" | "type"
>;
export type NonprofitProjectUpdate = Pick<Partial<Project>, "status">;
export type ChapterProjectUpdate = Pick<Partial<Project>, "status" | "contact">;

export type UserUpdate = Pick<
  Partial<User>,
  "name" | "image" | "phoneNum" | "calendly"
>;

export type ChapterUpdate = Omit<Partial<Chapter>, "_id">;

export type NonprofitCreate = Omit<Nonprofit, "_id" | "isVerified">;
export type NonprofitUpdate = Omit<Partial<Nonprofit>, "_id" | "isVerified">;

/* Enums */

export enum ProjectType {
  WEBSITE = "Website",
  WEB_APP = "Web app",
  MOBILE_APP = "Mobile app",
}

export enum NonprofitStage {
  APPLICATION = "Application",
  INTERVIEW = "Interview",
  IN_PROGRESS = "In Progress",
  COMPLETE = "Complete",
}

export enum ChapterStage {
  SUBMIT_APPLICATION = "Submit Application",
  APPLICATION_REVIEW = "Application Review",
  SCHEDULE_INTERVIEW = "Schedule Interview",
  INTERVIEW_SCHEDULED = "Interview Scheduled",
  INTERVIEW_REVIEW = "Interview Review",
  SCHEDULE_MEETING = "Schedule Meeting",
  MEETING_SCHEDULED = "Meeting Scheduled",
  MAINTENANCE = "Maintenance",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  REJECTED = "Rejected",
}

export enum Role {
  CHAPTER_MEMBER = "Chapter Member",
  NONPROFIT_MEMBER = "Nonprofit Member",
  NONPROFIT_ADMIN = "Nonprofit Admin",
}

// TODO: Remove this type and update chapter projects table
export interface ChapterProject {
  id: string;
  org: string;
  website: string;
  email: string;
  started: Date;
  lastUpdated: Date;
  status: string;
}
