import { Types } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { ChapterStage, InternalResponse, ProjectType } from "src/utils/types";
/*
import { 
  getChapterUserProfile,
} from "../../../server/mongodb/actions/User";
import {
  createProject,
  getChapterProjects,
  getProjectsByStatus,
  getProjectById,
  updateProjectStatus,
  updateProjectContact,
  getNonprofitProject,
} from "../../../server/mongodb/actions/Project";
*/

interface Data {
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InternalResponse<Data>>
) {
  /*
  getNonprofitProject(Types.ObjectId("60db9ac9c2e44048a7832a3c")).then(
    (project) => {
      console.log(project);
      res.status(200).json({ success: true, payload: project });
    }
  );
  */
  /*
  getProjectsByStatus(ChapterStage.IN_PROGRESS).then(
    (projects) => {
      console.log(projects);
      res.status(200).json({ success: true, payload: projects });
    }
  );
  */

  /*
  updateProjectContact(Types.ObjectId("60e770ae14297140a1529bef"), Types.ObjectId("10db9ac9c2e44048a7832a3c")).then(
    (updatedProject) => {
      console.log(updatedProject);
      res.status(200).json({ success: true, payload: updatedProject });
    }
  );
  */
  /*
  updateProjectStatus(Types.ObjectId("60e770ae14297140a1529bef"), ChapterStage.IN_PROGRESS).then(
    (updatedProject) => {
      console.log(updatedProject);
      res.status(200).json({ success: true, payload: updatedProject });
    }
  );
  */
  /*
  getProjectById(Types.ObjectId("60e770ae14297140a1529bef")).then(
    (project) => {
      console.log(project);
      res.status(200).json({ success: true, payload: project });
    }
  );
  */

  /*
  getChapterProjects(Types.ObjectId("60db9ac9c2e44048a7832a3d")).then(
    (projects) => {
      console.log(projects);
      res.status(200).json({ success: true, payload: projects });
    }
  );
  */

  /*
  createProject(Types.ObjectId("60db9ac9c2e44048a7832a3c"), Types.ObjectId("60db9ac9c2e44048a7832a3d"), ProjectType.WEBSITE).then(
    (project) => {
      console.log(project);
      res.status(200).json({ success: true, payload: project });
    }
  );
  */

  /*
  getChapterUserProfile(Types.ObjectId("60db9ac9c2e44048a7832a3c")).then(
    (user) => {
      console.log(user);
      res.status(200).json({ success: true, payload: user });
    }
  );
    */
  res.status(200).json({ success: true, payload: { name: "Matt" } });
}
