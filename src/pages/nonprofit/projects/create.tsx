import {
  Heading,
  Button,
  Input,
  Flex,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { nonprofitCreateProject } from "src/actions/Project";
import ProjectTypeCard from "src/components/nonprofit/projects/create/ProjectTypeCard";
import { showError, showInfo } from "src/utils/notifications";
import { NonprofitCreateProject, ProjectType } from "src/utils/types";
import urls from "src/utils/urls";
import { maxInput } from "src/utils/validation";

function NonprofitProjectCreationPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState<ProjectType>();
  const [isSaving, setSaving] = useState(false);

  const createProject = async () => {
    if (name.length === 0) {
      showError("Please enter a name for your project.");
      return;
    }

    if (!selectedType) {
      showError("Please select a project type.");
      return;
    }

    const projectCreate: NonprofitCreateProject = { name, type: selectedType };

    setSaving(true);

    try {
      await nonprofitCreateProject(projectCreate);
      showInfo("Successfully created project.");
      await router.replace(urls.pages.nonprofit.projects.index);
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }

    setSaving(false);
  };

  return (
    <Flex height="100%" width="100%" padding="40px">
      <Flex flexBasis="1200px" margin="auto">
        <VStack width="100%" align="stretch" spacing="60px">
          <Heading>Start a Project</Heading>
          <VStack align="stretch" spacing="20px">
            <Text fontSize="2xl" fontWeight="bold">
              Give your project a name
            </Text>
            <Input
              value={name}
              maxLength={maxInput}
              maxWidth="500px"
              placeholder="Project Name"
              size="md"
              variant="outline"
              backgroundColor="surface"
              borderColor="border"
              onChange={(e) => setName(e.target.value)}
            />
          </VStack>
          <VStack align="stretch" spacing="20px">
            <Text fontSize="2xl" fontWeight="bold">
              Select a project type
            </Text>
            <Wrap spacing="20px">
              {Object.values(ProjectType).map((type) => (
                <WrapItem key={type}>
                  <ProjectTypeCard
                    isSelected={selectedType === type}
                    projectType={type}
                    onClick={() => setSelectedType(type)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
          <Button
            alignSelf="flex-end"
            width="150px"
            variant="primary"
            onClick={createProject}
            isLoading={isSaving}
          >
            Create Project
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default NonprofitProjectCreationPage;
