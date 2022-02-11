import { InternalRequestData, InternalResponseData } from "src/utils/types";

export async function internalRequest<T>({
  url,
  queryParams,
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

  if (queryParams) {
    const urlSearchParams = new URLSearchParams(
      Object.entries(queryParams)
        .map(([key, value]) => [key, serializeQueryValue(value)])
        .filter(([, value]) => value !== null) as [string, string][]
    );
    url = `${url}?${urlSearchParams.toString()}`;
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

function serializeQueryValue(
  value: string | number | boolean | Record<string, unknown> | undefined | null
): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value == "object") {
    return JSON.stringify(value);
  }
  return value.toString();
}
