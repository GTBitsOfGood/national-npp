import { Button, Flex, HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { chapterGetProject, chapterUpdateProject } from "src/actions/Project";
import NonprofitInfoCard from "src/components/chapter/application/NonprofitInfoCard";
import ApplicationCard from "src/components/shared/ApplicationCard";
import { showError, showInfo } from "src/utils/notifications";
import { ProjectStage, Project, ChapterUpdateProject } from "src/utils/types";
import urls from "src/utils/urls";

function ChapterApplicationPage() {
  // TODO: Pass current project's id
  const projectId = "616ba502a1667f4a0eadcfa1";
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    async function preloadFields() {
      const project = await chapterGetProject(projectId, {
        status: ProjectStage.APPLICATION_REVIEW,
      });

      setProject(project);
    }

    preloadFields().catch((error: Error) => {
      showError(error.message);
    });
  }, []);

  const handleClaimProject = async () => {
    const projectUpdate: ChapterUpdateProject = {
      status: ProjectStage.SCHEDULE_INTERVIEW,
    };

    try {
      await chapterUpdateProject(projectId, projectUpdate);
      showInfo("Successfully claimed project.");
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }
  };

  return (
    <Flex
      height="100%"
      width="100%"
      padding={{ base: "40px 0px", md: "40px 20px" }}
    >
      <VStack align="stretch" margin="auto" spacing="30px">
        <Flex justifyContent="space-between" paddingX="10px">
          <Link href={urls.pages.chapter.applications.index} passHref={true}>
            <Button leftIcon={<IoIosArrowRoundBack />} variant="secondary">
              Nonprofit Applications
            </Button>
          </Link>
          <Button variant="primary" onClick={handleClaimProject}>
            Claim Project
          </Button>
        </Flex>
        <HStack align="start">
          {project && <NonprofitInfoCard project={project} />}
          {project && <ApplicationCard isRead={true} project={project} />}
        </HStack>
      </VStack>
    </Flex>
  );
}

export default ChapterApplicationPage;
