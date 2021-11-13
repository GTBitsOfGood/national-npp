import { JTDSchemaType } from "ajv/lib/types/jtd-schema";
import { Types } from "mongoose";
import {
  nonprofitCreateIssue,
  nonprofitGetIssues,
} from "server/mongodb/actions/Issue";
import { nonprofitGetProject } from "server/mongodb/actions/Project";
import { APIWrapper } from "server/utils/APIWrapper";
import { ID_QUERY_SCHEMA, IDQuery } from "server/utils/request-validation";
import {
  InternalRequest,
  IssueStatus,
  MaintenanceType,
  NonprofitCreateIssue,
  NonprofitIssuesListQuery,
  Role,
} from "src/utils/types";

const GET_QUERY_SCHEMA: JTDSchemaType<NonprofitIssuesListQuery> = {
  properties: {
    id: { type: "string" },
    filters: {
      optionalProperties: {
        status: {
          properties: {
            $open: {
              type: "boolean",
            },
          },
        },
      },
    },
  },
};

const POST_BODY_SCHEMA: JTDSchemaType<NonprofitCreateIssue> = {
  properties: {
    type: {
      enum: Object.values(MaintenanceType),
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    status: {
      enum: Object.values(IssueStatus),
    },
  },
  optionalProperties: {
    images: {
      elements: { type: "string" },
    },
  },
};

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
      querySchema: GET_QUERY_SCHEMA,
    },
    handler: async (
      req: InternalRequest<NonprofitIssuesListQuery, undefined>
    ) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const project = await nonprofitGetProject(
        Types.ObjectId(req.query.id),
        nonprofitId,
        {}
      );

      if (!project) {
        throw new Error("Nonprofit does not have access to this project");
      }

      const issues = await nonprofitGetIssues(req.query);

      return issues;
    },
  },
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
      querySchema: ID_QUERY_SCHEMA,
      bodySchema: POST_BODY_SCHEMA,
    },
    handler: async (req: InternalRequest<IDQuery, NonprofitCreateIssue>) => {
      const projectId = Types.ObjectId(req.query.id);
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User is not part of a Nonprofit!");
      }

      const project = await nonprofitGetProject(projectId, nonprofitId, {});

      if (!project) {
        throw new Error("Nonprofit does not own this project!");
      }

      const issue = await nonprofitCreateIssue(projectId, req.body);

      return issue;
    },
  },
});
