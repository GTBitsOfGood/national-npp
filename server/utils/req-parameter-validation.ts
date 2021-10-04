type QueryParam = string | string[];

export function tryToParseBoolean(
  value: QueryParam | undefined
): boolean | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  value = value.toLowerCase();
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return undefined;
}
