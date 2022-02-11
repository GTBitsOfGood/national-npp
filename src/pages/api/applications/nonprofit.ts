import { JTDSchemaType } from "ajv/lib/types/jtd-schema";
import { Types } from "mongoose";
import { nonprofitCreateApplication } from "server/mongodb/actions/Application";
import { APIWrapper } from "server/utils/APIWrapper";
import {
  InternalRequest,
  NonprofitCreateApplication,
  Role,
} from "src/utils/types";

type ApplicationCreate = {
  projectId: string;
  applicationCreate: NonprofitCreateApplication;
};

const POST_BODY_SCHEMA: JTDSchemaType<ApplicationCreate> = {
  properties: {
    projectId: {
      type: "string",
    },
    applicationCreate: {
      optionalProperties: {
        aboutQ1: { type: "string" },
        aboutQ2: { type: "string" },
        aboutQ3: { type: "string" },
        aboutQ4: { type: "string" },
        needsQ1: { type: "string" },
        needsQ2: { type: "string" },
        needsQ3: { type: "string" },
        needsQ4: { type: "string" },
        needsQ5: { type: "string" },
      },
    },
  },
};

export default APIWrapper({
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_ADMIN],
      bodySchema: POST_BODY_SCHEMA,
    },
    handler: async (req: InternalRequest<undefined, ApplicationCreate>) => {
      const application = await nonprofitCreateApplication(
        Types.ObjectId(req.body.projectId),
        req.body.applicationCreate
      );

      return application;
    },
  },
});
