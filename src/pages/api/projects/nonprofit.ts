import { JTDSchemaType } from "ajv/lib/types/jtd-schema";
import {
  nonprofitCreateProject,
  nonprofitGetProjects,
} from "server/mongodb/actions/Project";
import { APIWrapper } from "server/utils/APIWrapper";
import {
  InternalRequest,
  NonprofitCreateProject,
  NonprofitProjectsListQuery,
  ProjectStage,
  ProjectType,
  Role,
} from "src/utils/types";

const GET_QUERY_SCHEMA: JTDSchemaType<NonprofitProjectsListQuery> = {
  properties: {
    filters: {
      optionalProperties: {
        status: {
          discriminator: "type",
          mapping: {
            $active: {
              properties: {
                $active: {
                  type: "boolean",
                },
              },
            },
            $eq: {
              properties: {
                $eq: {
                  enum: Object.values(ProjectStage),
                },
              },
            },
          },
        },
      },
    },
  },
};

const POST_BODY_SCHEMA: JTDSchemaType<NonprofitCreateProject> = {
  properties: {
    name: {
      type: "string",
    },
    type: {
      enum: Object.values(ProjectType),
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
      req: InternalRequest<NonprofitProjectsListQuery, undefined>
    ) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const projects = await nonprofitGetProjects(nonprofitId, req.query);

      return projects;
    },
  },
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_ADMIN],
      bodySchema: POST_BODY_SCHEMA,
    },
    handler: async (
      req: InternalRequest<undefined, NonprofitCreateProject>
    ) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }
      const project = await nonprofitCreateProject(nonprofitId, req.body);

      return project;
    },
  },
});
