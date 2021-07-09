/* 
    Only define types used in multiple files here. Keep single file types like
    prop interfaces in their respective files.
*/

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

export interface Chapter {
  id: string;
  school: string;
  location: string;
  projectTypes: string[];
  email: string;
  website: string;
  facebook?: string;
  instagram?: string;
  open: boolean;
}

export interface ChapterProject {
  id: string;
  org: string;
  website: string;
  email: string;
  started: Date;
  lastUpdated: Date;
  status: string;
}
