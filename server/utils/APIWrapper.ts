import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
  HttpMethod,
  InternalRequest,
  InternalResponseData,
  Role,
} from "src/utils/types";

interface RouteConfig {
  requireSession: boolean;
  roles?: Array<Role>;
}

interface Route<T> {
  config?: RouteConfig;
  handler: (
    req: InternalRequest,
    res: NextApiResponse<InternalResponseData<T>>
  ) => Promise<T>;
}

function APIWrapper(
  routeHandlers: Partial<Record<HttpMethod, Route<unknown>>>
) {
  return async (req: InternalRequest, res: NextApiResponse) => {
    const method = req.method;
    const route = routeHandlers[method as HttpMethod];

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

      const data = await handler(req, res);

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

export default APIWrapper;
