import { InternalRequestData, InternalResponseData } from "src/utils/types";

export async function internalRequest<T>({
  url,
  method,
  body,
}: InternalRequestData): Promise<T> {
  const requestInfo: RequestInit = {
    method,
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    requestInfo.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestInfo);
  const responseBody = (await response.json()) as InternalResponseData<T>;

  if (!responseBody) {
    throw new Error("Unable to connect to API.");
  } else if (!responseBody.success) {
    const errorMessage = responseBody.message;
    throw new Error(errorMessage);
  }

  return responseBody.payload as T;
}
