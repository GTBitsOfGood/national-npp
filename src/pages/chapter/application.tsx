import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, HStack, Link, VStack } from "@chakra-ui/react";
import React from "react";
import { updateChapterProject } from "src/actions/Project";
import ApplicationCard from "src/components/ApplicationCard";
import NonprofitInfoCard from "src/components/NonprofitInfoCard";
import { showError, showInfo } from "src/utils/notifications";
import { ChapterProjectUpdate, ProjectStage } from "src/utils/types";

function ChapterApplicationPage() {
  // Todo: pass in the current project's id
  const projectId = "616ba502a1667f4a0eadcfa1";
  const nonprofitId = "60f208139c188f6f2fc71ffd";

  const handleClaimProject = async () => {
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
      <VStack border="dotted" align="stretch" margin="auto">
        <Flex
          paddingLeft={{ base: "0px", md: "50px" }}
          border="solid"
          justifyContent="space-between"
        >
          <Link href="/chapter/projects">
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="blue"
              variant="link"
            >
              <i className="fa fa-angle-left" /> Nonprofit Applications
            </Button>
          </Link>
          <Button color="white" bgColor="primary" onClick={handleClaimProject}>
            Claim Project
          </Button>
        </Flex>
        <HStack align="start">
          <NonprofitInfoCard projectId={projectId} />
          <ApplicationCard isRead={true} projectId={projectId} />
        </HStack>
      </VStack>
    </Flex>
  );
}

export default ChapterApplicationPage;
