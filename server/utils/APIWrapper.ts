import { JSONSchemaType } from "ajv";
import Ajv, {
  ErrorObject,
  JTDSchemaType,
  SomeJTDSchemaType,
} from "ajv/dist/jtd";
import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
  InternalRequest,
  InternalResponseData,
  Role,
  StringsDict,
  UnknownDict,
} from "src/utils/types";

interface RouteConfig<Q_P, B> {
  requireSession: boolean;
  roles?: Array<Role>;
  handleResponse?: boolean; // handleResponse if the route handles setting status code and body
  bodySchema?: JTDSchemaType<B>;
  querySchema?: JTDSchemaType<Q_P>;
}

export interface Route<Q_P, B, R> {
  config?: RouteConfig<Q_P, B>;
  handler: (
    req: InternalRequest<Q_P, B>,
    res: NextApiResponse<InternalResponseData<R>>
  ) => Promise<R>;
}

export type UnvalidatedInputRoute = {
  config: Omit<
    RouteConfig<StringsDict, UnknownDict>,
    "bodySchema" | "querySchema"
  >;
  handler: (
    req: InternalRequest<StringsDict, UnknownDict>,
    res: NextApiResponse
  ) => Promise<unknown>;
};

/**
 * @deprecated Please import { APIWrapper } instead, which enforces schemas
 * Does not validate input schemas for the API
 * @param routeHandlers
 */
export function UnvalidatedInputAPIWrapper(
  routeHandlers: Partial<
    Record<"GET" | "PATCH" | "POST" | "PUT", UnvalidatedInputRoute>
  >
) {
  return APIWrapper(routeHandlers);
}

/**
 * In order to use the body or query params from the API wrapper, you must provide a schema
 * to validate the input
 * See  src/pages/api/applications/[id]/chapter.ts and
 * src/pages/api/applications/nonprofit.ts
 * as references
 * @param routeHandlers
 * @constructor
 */
export function APIWrapper<
  GET_Q_P,
  GET_B,
  GET_R,
  PATCH_Q_P,
  PATCH_B,
  PATCH_R,
  POST_Q_P,
  POST_B,
  POST_R,
  PUT_Q_P,
  PUT_B,
  PUT_R
>(
  routeHandlers: Partial<{
    GET: Route<GET_Q_P, GET_B, GET_R>;
    PATCH: Route<PATCH_Q_P, PATCH_B, PATCH_R>;
    POST: Route<POST_Q_P, POST_B, POST_R>;
    PUT: Route<PUT_Q_P, PUT_B, PUT_R>;
  }>
) {
  return async (
    req: InternalRequest<StringsDict, UnknownDict>,
    res: NextApiResponse
  ) => {
    const method = req.method;
    const route = (
      routeHandlers as Partial<Record<string, Route<unknown, unknown, unknown>>>
    )[req.method as string];

    if (!method || !route) {
      const errorMessage = method
        ? `Request method ${method} is invalid.`
        : "Missing request method.";

      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const { config, handler } = route;

    try {
      if (!config || config.requireSession) {
        const session = await getSession({ req });

        if (!session || !session.user) {
          return res
            .status(401)
            .json({ success: false, message: "User is not logged in." });
        }

        const user = session.user;

        if (config && config.roles) {
          if (!config.roles.some((role) => user.roles.includes(role))) {
            return res.status(401).json({
              success: false,
              message: "User is not authorized to access this API route.",
            });
          }
        }

        req.user = user;
      }

      const data = await handler(validateAndCoerceReq(route, req), res);

      if (config?.handleResponse) {
        return;
      }

      return res.status(200).json({ success: true, payload: data });
    } catch (e) {
      if (e instanceof mongoose.Error) {
        return res
          .status(500)
          .json({ success: false, message: "Internal Server error occurred." });
      }

      const error = e as Error;
      return res.status(400).json({ success: false, message: error.message });
    }
  };
}

const ajvBodyParser = new Ajv();
const ajvQueryParamParser = new Ajv();

function validateAndCoerceReq<Q_P, B, R>(
  { config, handler }: Route<Q_P, B, R>,
  req: InternalRequest<StringsDict, UnknownDict>
): InternalRequest<Q_P, B> {
  const castedReq = req as unknown as InternalRequest<Q_P, B>;
  castedReq.query = config?.querySchema
    ? validateAndCoerceDataToSchema(
        "query",
        ajvQueryParamParser,
        config?.querySchema,
        parseJSONQueryParams(config.querySchema, req.query)
      )
    : (req.query as unknown as Q_P);
  castedReq.body = config?.bodySchema
    ? validateAndCoerceDataToSchema(
        "body",
        ajvBodyParser,
        config.bodySchema,
        req.body
      )
    : (req.body as unknown as B);
  return castedReq;
}

// parseJSONQueryParams attempts to convert JSON strings to JavaScript objects.
// it infers if a query param string is in JSON using the schema. if this does not work consistently,
// then switch it over from inference to a configuration option specifying the params that need to be transformed
// or create a custom type that wraps a schema and specifies root level transformations in that wrapper
//
// Essentially: NextJS query params are: either string | string[]
// This method expands the possible types to: string | string[] | Object
function parseJSONQueryParams(
  schema: JTDSchemaType<unknown>,
  query: StringsDict
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(query).map(([key, value]) => [
      key,
      isObjectInRootSchema(schema, key)
        ? tryToParseJSONFromQueryParam(query, key)
        : value,
    ])
  );
}

function isObjectInRootSchema(
  schema: JTDSchemaType<unknown>,
  key: string
): boolean {
  const schemaType =
    (schema as any as { properties: Record<string, SomeJTDSchemaType> })
      .properties?.[key] ||
    (schema as any as { optionalProperties: Record<string, SomeJTDSchemaType> })
      .optionalProperties?.[key];
  return (
    schemaType != undefined &&
    ("properties" in schemaType || "optionalProperties" in schemaType)
  );
}

function tryToParseJSONFromQueryParam(
  query: StringsDict,
  key: string
): Record<string, unknown> {
  try {
    return JSON.parse(query[key] as string) as Record<string, unknown>;
  } catch (e) {
    throw new Error(
      `Validation Error: Expected ${key} query param to be a JSON string`
    );
  }
}

function validateAndCoerceDataToSchema<T>(
  source: "body" | "query",
  ajvParser: Ajv,
  schema: JTDSchemaType<T>,
  data: { [key: string]: unknown }
): T {
  const validate = ajvParser.compile(schema);
  if (validate(data)) {
    return data;
  }
  const errors = validate.errors as ErrorObject[];
  throw new Error(
    `${source.toUpperCase()} Validation Error: ${errors
      .map((error) => `${error.instancePath} ${error.message ?? ""}`)
      .join(";")}`
  );
}

export default UnvalidatedInputAPIWrapper;
