import { Types } from "mongoose";
import { NextComponentType } from "next";
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
  name: string;
  image?: string;
  phoneNum?: string;
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
  contact: User | Types.ObjectId;
  address: Address;
  website?: string;
  facebook?: string;
  instagram?: string;
  maintenanceTypes: Array<MaintenanceType>;
  maintenancePeriod: number;
}

export interface Nonprofit {
  _id: Types.ObjectId;
  name: string;
  address: Address;
  isVerified: boolean;
  contact: User | Types.ObjectId;
  website?: string;
  mission?: string;
}

export interface Project {
  _id: Types.ObjectId;
  chapter: Chapter | Types.ObjectId;
  nonprofit: Nonprofit | Types.ObjectId;
  name: string;
  status: ProjectStage;
  type: ProjectType;
  contact?: User | Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  _id: Types.ObjectId;
  project: Types.ObjectId;
  aboutQ1?: string;
  aboutQ2?: string;
  aboutQ3?: string;
  aboutQ4?: string;
  needsQ1?: string;
  needsQ2?: string;
  needsQ3?: string;
  needsQ4?: string;
  needsQ5?: string;
}

export interface Issue {
  _id: Types.ObjectId;
  project: Types.ObjectId;
  type: MaintenanceType;
  title: string;
  description: string;
  status: IssueStatus;
  images?: Array<string>;
  reviewer?: Types.ObjectId; // The chapter member assigned to this issue
  createdAt: Date;
  updatedAt: Date;
  finishedAt?: Date;
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
  PUT = "PUT",
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
  queryParams?: { [key: string]: string | number | boolean | undefined };
}

export interface InternalResponseData<T> {
  success: boolean;
  message?: string;
  payload?: T;
}

export interface PageAuth {
  requireSession: boolean;
  roles?: Array<Role>;
}

export type AuthComponent = NextComponentType & { auth: PageAuth | undefined };

export type NonprofitCreateProject = Pick<
  Required<Project>,
  "chapter" | "name" | "type"
>;
export type ChapterGetProjects = { status?: ProjectStage };
export type NonprofitGetProjects = { active?: boolean };
export type NonprofitUpdateProject = Pick<Partial<Project>, "status">;
export type ChapterGetProject = { status?: ProjectStage };
export type ChapterUpdateProject = Pick<
  Partial<Project>,
  "status" | "contact" | "chapter"
>;

export type NonprofitCreateApplication = Omit<Application, "_id" | "project">;

export type NonprofitUpdateUser = Pick<
  Partial<User>,
  "name" | "image" | "phoneNum"
>;
export type ChapterUpdateUser = Pick<
  Partial<User>,
  "name" | "image" | "phoneNum"
>;

export type ChapterUpdateChapter = Omit<Partial<Chapter>, "_id">;

export type NonprofitCreateNonprofit = Omit<Nonprofit, "_id" | "isVerified">;
export type NonprofitUpdateNonprofit = Omit<
  Partial<Nonprofit>,
  "_id" | "isVerified"
>;

/* Enums */

export enum ProjectType {
  WEBSITE = "Website",
  WEB_APP = "Web app",
  MOBILE_APP = "Mobile app",
}

export enum MaintenanceType {
  BUG_FIXES = "Bug Fixes",
  NEW_FEATURES = "New Features",
}

export enum DisplayableProjectStage {
  APPLICATION = "Application",
  INTERVIEW = "Interview",
  IN_PROGRESS = "In Progress",
  COMPLETE = "Complete",
}

export enum ProjectStage {
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

export enum IssueStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  RESOLVED = "Resolved",
  CLOSED = "Closed",
}

export enum Role {
  CHAPTER_MEMBER = "Chapter Member",
  CHAPTER_ADMIN = "Chapter Admin",
  NONPROFIT_MEMBER = "Nonprofit Member",
  NONPROFIT_ADMIN = "Nonprofit Admin",
}

export interface Contact {
  id: string;
  name: string;
  email: string;
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

export interface UploadFileOptions {
  nameWithoutExtension?: string;
  onProgress?: (progressPercent: number) => void;
}

export interface UploadedFile {
  blobPath: string; // blobPath is the path to the file in the blob storage container (including the file name)
  name: string; // name is the name of the file in blob storage
}

export interface Email {
  data: Record<string, unknown>; // data contains the the variables for the template
  templateName: string; // templateName is the the name of the directory within `emails/` containing the template resources
}
