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
  chapterId?: Types.ObjectId;
  nonprofit?: Nonprofit;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  _id: Types.ObjectId;
  name: string;
  email: string;
  address: Address;
  phoneNum?: string;
  projectProcess: Array<NonprofitStage>;
  projectTypes: Array<ProjectType>;
  projectLimit: number;
  website?: string;
  facebook?: string;
  instagram?: string;
}

export interface Nonprofit {
  name: string;
  address: string;
  isVerified: boolean;
  website?: string;
  mission?: string;
}

export interface Project {
  _id: Types.ObjectId;
  chapterId: Types.ObjectId;
  userId: Types.ObjectId;
  status: ChapterStage;
  type?: ProjectType;
  contact?: Types.ObjectId;
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
  IN_PROGRESS = "In Progress",
  COMPLETE = "Complete",
}

export enum ChapterStage {
  NEW_PROJECT = "New Project",
  APPLICATION_COMPLETE = "Application Complete",
  INTERVIEW_SCHEDULED = "Interview Scheduled",
  UNDER_REVIEW = "Under Review",
  IN_PROGRESS = "In Progress",
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
