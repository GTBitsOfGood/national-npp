import { Button, Flex, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { nonprofitGetProject } from "src/actions/Project";
import ApplicationCard from "src/components/shared/ApplicationCard";
import LoadingIndicator from "src/components/shared/LoadingIndicator";
import { showError } from "src/utils/notifications";
import { Project, ProjectStage } from "src/utils/types";
import urls from "src/utils/urls";

function NonprofitApplicationPage() {
  const router = useRouter();
  const projectId = router.query.id as string;

  const [project, setProject] = useState<Project>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getProject() {
      const project = await nonprofitGetProject(projectId, {
        status: ProjectStage.SUBMIT_APPLICATION,
      });

      if (!project) {
        showError("Project does not exist.");
        await router.replace(urls.pages.nonprofit.projects.index);
      }

      setProject(project);
    }

    if (projectId) {
      setLoading(true);

      getProject()
        .then(() => setLoading(false))
        .catch((e: Error) => {
          showError(e.message);
          router
            .replace(urls.pages.nonprofit.projects.index)
            .catch((e: Error) => showError(e.message));
        });
    }
  }, [projectId, router]);

  return (
    <Flex height="100%" width="100%">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <VStack spacing="20px" margin="auto" align="start" paddingY="40px">
          <Link href={urls.pages.nonprofit.projects.index} passHref={true}>
            <Button leftIcon={<HiOutlineChevronLeft />} variant="secondary">
              My Projects
            </Button>
          </Link>
          {project && <ApplicationCard isRead={false} project={project} />}
        </VStack>
      )}
    </Flex>
  );
}

export default NonprofitApplicationPage;
