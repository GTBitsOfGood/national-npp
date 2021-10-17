import { Button, Flex, Heading, HStack, Link, VStack } from "@chakra-ui/react";
import React from "react";
import { updateChapterProject } from "src/actions/Project";
import ApplicationCard from "src/components/ApplicationCard";
import NonprofitInfoCard from "src/components/NonprofitInfoCard";
import { showError, showInfo } from "src/utils/notifications";
import {
  ChapterProjectUpdate,
  NonprofitProjectUpdate,
  ProjectStage,
} from "src/utils/types";

function ChapterApplicationPage() {
  // Todo: pass in the current project's id
  const projectId = "616ba502a1667f4a0eadcfa1";
  const nonprofitId = "60f208139c188f6f2fc71ffd";

  const handleClaimProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const projectUpdate: ChapterProjectUpdate = {
      status: ProjectStage.SCHEDULE_INTERVIEW,
    };

    try {
      await updateChapterProject(projectId, projectUpdate);
      showInfo("Successfully claimed project.");
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }
  };

  return (
    <Flex height="100%" width="100%" marginTop={10}>
      <VStack>
        <HStack spacing={1125}>
          <Link color="blue" href="/chapter/projects">
            Nonprofit Applications
          </Link>
          <Button
            color="#ffffff"
            bgColor="primary"
            onClick={handleClaimProject}
          >
            Claim Project
          </Button>
        </HStack>
        <HStack align="start">
          <Flex>
            <NonprofitInfoCard projectId={projectId} />
          </Flex>
          <Flex>
            <ApplicationCard isRead={true} projectId={projectId} />
          </Flex>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default ChapterApplicationPage;
