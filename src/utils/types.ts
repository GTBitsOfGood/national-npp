import { Types } from "mongoose";

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
  isAdmin: boolean;
  chapter?: Chapter | Types.ObjectId;
  nonprofit?: Nonprofit | Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  _id: Types.ObjectId;
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

export interface Form {
  _id: Types.ObjectId;
  name: string;
  type: FormType;
  chapterId: Types.ObjectId;
  groups: Array<QuestionGroup>;
}

export interface FormResponse {
  _id: Types.ObjectId;
  projectId: Types.ObjectId;
  groups: Array<QuestionGroup>;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionGroup {
  title: string;
  subtitle?: string;
  questions: Array<Question>;
}

export interface Question {
  description: string;
  answer?: string;
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

export interface InternalRequest {
  url: string;
  method: HttpMethod;
  body?: { [key: string]: unknown };
}

export interface InternalResponse<T> {
  success: boolean;
  message?: string;
  payload?: T;
}

export type ChapterChange = Omit<Partial<Chapter>, "_id">;
export type NonprofitChange = Omit<Partial<Nonprofit>, "_id" | "isVerified">;
export type UserChange = Pick<
  Partial<User>,
  "name" | "image" | "phoneNum" | "calendly"
>;

/* Enums */

export enum ProjectType {
  WEBSITE = "Website",
  WEB_APP = "Web app",
  MOBILE_APP = "Mobile app",
}

export enum FormType {
  APPLICATION = "Application",
  FEEDBACK = "Feedback",
}

export enum QuestionType {
  SHORT_ANSWER = "Short Answer",
}

export enum NonprofitStage {
  APPLICATION = "Application",
  INTERVIEW = "Interview",
  UNDER_REVIEW = "Under review",
  IN_PROGRESS = "In Progress",
  COMPLETE = "Complete",
}

export enum ChapterStage {
  APPLICATION = "Awaiting Application",
  APPLICATION_SUBMITTED = "Application Submitted",
  INTERVIEW = "Awaiting Interview",
  INTERVIEW_SCHEDULED = "Interview Scheduled",
  UNDER_REVIEW = "Under review",
  IN_PROGRESS = "In Progress",
  MEETING_SCHEDULED = "Meeting Scheduled",
  DELIVERED = "Delivered",
  MAINTENANCE = "In Maintenance",
  CLOSED = "Closed",
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
