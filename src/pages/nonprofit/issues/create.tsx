import { Button } from "@chakra-ui/button";
import { Heading, Stack, Text, VStack, Link } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Flex } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import { useEffect, useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { nonprofitCreateIssue } from "src/actions/Issue";
import { nonprofitGetProject } from "src/actions/Project";
import { showError, showInfo } from "src/utils/notifications";
import {
  Chapter,
  IssueStatus,
  MaintenanceType,
  NonprofitCreateIssue,
  Project,
  ProjectStage,
  UploadedFile,
} from "src/utils/types";
import { uploadFile } from "src/utils/uploaded-files";
import urls from "src/utils/urls";

function NonprofitIssueCreationPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issueType, setIssueType] = useState<MaintenanceType>();
  const [project, setProject] = useState<Project>();
  const [preUploadImages, setPreUploadImages] = useState<FileList>();
  const [images, setImages] = useState<UploadedFile[]>([]);
  const [chapterIssueTypes, setChapterIssueTypes] = useState<MaintenanceType[]>(
    [MaintenanceType.BUG_FIXES, MaintenanceType.NEW_FEATURES]
  );
  const [projectId, setProjectId] = useState("617ea71c069ce109e2ae9f83");

  useEffect(() => {
    async function getProject() {
      let project;
      try {
        project = await nonprofitGetProject(projectId, {
          status: ProjectStage.MAINTENANCE,
        });
      } catch (e) {
        showError((e as Error).message);
      }
      if (!project) {
        showError("Project does not exist.");
        return;
      }

      setProject(project);
    }

    getProject()
      .then(() => {
        if (project) {
          /**
           * project.chapter as Chapter does not currently work either but when it will change:
           * setChapterIssueTypes([MaintenanceType.BUG_FIXES, MaintenanceType.NEW_FEATURES]);
           * to
           * setChapterIssueTypes(chapter.maintenanceTypes;);
           */
          const chapter = project.chapter as Chapter;
          setChapterIssueTypes([
            MaintenanceType.BUG_FIXES,
            MaintenanceType.NEW_FEATURES,
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const uploadImages = async ({ imageList }: { imageList: FileList }) => {
    if (!imageList){
      return;
    }

    if (imageList.length > 4) {
      showError("Cannot upload more than 4 images!");
    }

    for (let i = 0; i < imageList.length; i++) {
      const result = await uploadFile(imageList[i], {
        onProgress(percent) {
          console.log(percent);
        },
      });
      setImages([...images, result]);
    }
  };

  const submitForm = async () => {
    if (!projectId) {
      showError("Project does not exist.");
      return;
    }

    if (title.length === 0) {
      showError("Please enter a title for your issue.");
      return;
    }

    if (description.length === 0) {
      showError("Please enter a description for your issue.");
      return;
    }

    let blobPaths = [] as string[];
    if (preUploadImages){
      uploadImages({imageList: preUploadImages})
        .then(() => {
          blobPaths = images.map(({ blobPath }) => blobPath);
        })
        .catch((e) => {
          showError((e as Error).message);
        });
    }

    const issueCreate: NonprofitCreateIssue = {
      type: issueType as MaintenanceType,
      title: title,
      description: description,
      status: IssueStatus.IN_PROGRESS,
      images: blobPaths,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      await nonprofitCreateIssue(projectId, issueCreate);
      showInfo("Successfully created issue.");
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }
  };
  return (
    <Flex height="100%" width="100%">
      <Flex flexBasis="1000px" margin="auto">
        <VStack spacing={10} marginY={50}>
          <Link
            alignSelf="flex-start"
            href={urls.pages.nonprofit.issues.index}
            passHref={true}
          >
            <Button
              size="lg"
              leftIcon={<HiOutlineChevronLeft />}
              variant="secondary"
            >
              Maintenance
            </Button>
          </Link>
          <Heading alignSelf="flex-start"> File a Maintenance Request </Heading>
          <Text alignSelf="flex-start">
            Experiencing issues with your current Bits of Good product? Are
            loading times too long, or are your users facing bugs? Let us know,
            and we will contact you soon with an estimated timeline for a fix.
          </Text>
          <VStack
            minW={{ base: 425, md: 800 }}
            p={12}
            border="1px solid #657788"
            borderRadius={10}
            direction="column"
            backgroundColor="surface"
            spacing={5}
            align="stretch"
            alignSelf="stretch"
          >
            <Text fontSize="md">Issue Type</Text>
            <RadioGroup
              onChange={(value) => {
                setIssueType(value as MaintenanceType);
              }}
            >
              <Stack direction="row" spacing={5}>
                {chapterIssueTypes.map((issueType, index) => (
                  <Radio fontSize="lg" value={issueType} key={index}>
                    {issueType}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Text fontSize="md">Title</Text>
            <Textarea
              value={title}
              placeholder="Enter a short title to describe the issue"
              onChange={(e) => setTitle(e.target.value)}
            />

            <Text fontSize="md">Description</Text>
            <Textarea
              value={description}
              placeholder="Enter a brief description of the issue with your software. We will do our best to replicate it on our end, and then reach out if we have any questions or have suggestions for how to fix it on your end."
              onChange={(e) => setDescription(e.target.value)}
            />

            <Text fontSize="md">Screenshots (Optional)</Text>
            <Button alignSelf="start" colorScheme="blue" variant="outline">
              Upload File
            </Button>
            <Stack>
              <Text fontWeight={500} fontSize="md">
                Please let us know if you have any other questions or feedback.
              </Text>
              <Text fontWeight={500} fontSize="md">
                You can also reach out to us at{" "}
                <Link
                  color="blue"
                  href="https://contact@hack4impact.org"
                  isExternal
                >
                  contact@hack4impact.org.
                </Link>
              </Text>
            </Stack>
            <Button alignSelf="end" colorScheme="blue" onClick={submitForm}>
              Submit Form
            </Button>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default NonprofitIssueCreationPage;
