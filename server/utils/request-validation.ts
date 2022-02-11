import { JTDSchemaType } from "ajv/lib/types/jtd-schema";

export type IDQuery = {
  id: string;
};

// ID_QUERY_SCHEMA represents the common schema of just having an 'id' as a query param
export const ID_QUERY_SCHEMA: JTDSchemaType<IDQuery> = {
  properties: {
    id: {
      type: "string",
    },
  },
};
