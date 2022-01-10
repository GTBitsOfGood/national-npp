import {
  Button,
  Flex,
  Input,
  Stack,
  Text,
  VStack,
  Textarea,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { nonprofitCreateIssue } from "src/actions/Issue";
import { nonprofitGetProject } from "src/actions/Project";
import UploadCard from "src/components/nonprofit/projects/project/issues/create/UploadCard";
import PageLoadingIndicator from "src/components/shared/PageLoadingIndicator";
import { showError, showInfo } from "src/utils/notifications";
import {
  Chapter,
  IssueStatus,
  MaintenanceType,
  NonprofitCreateIssue,
  ProjectStage,
} from "src/utils/types";
import { uploadFile } from "src/utils/uploaded-files";
import urls from "src/utils/urls";
import { maxInput, maxTextArea } from "src/utils/validation";

function NonprofitIssueCreationPage() {
  const router = useRouter();
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issueType, setIssueType] = useState<MaintenanceType>();
  const [images, setImages] = useState<File[]>([]);
  const [chapterIssueTypes, setChapterIssueTypes] = useState<MaintenanceType[]>(
    []
  );
  const [isLoading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    async function getProject() {
      const projectId = router.query.id as string;

      const project = await nonprofitGetProject(projectId, {
        status: ProjectStage.MAINTENANCE,
      });

      if (!project) {
        showError("Project does not exist.");
      }

      const projectChapter = project.chapter as Chapter;
      setChapterIssueTypes(projectChapter.maintenanceTypes);
    }

    setLoading(true);

    getProject()
      .then(() => setLoading(false))
      .catch((e) => {
        const error = e as Error;
        showError(error.message);
      });
  }, [router]);

  const addImages = (newImages: FileList | null) => {
    if (!newImages) return;

    const updatedImages = [...images];

    for (let i = 0; i < newImages.length; i++) {
      updatedImages.push(newImages[i]);
    }

    setImages(updatedImages);
  };

  const removeImage = (imageToRemove: File) => {
    let updatedImages = [...images];
    updatedImages = updatedImages.filter(
      (image) => image.name !== imageToRemove.name
    );

    setImages(updatedImages);
  };

  const uploadImages = async () => {
    const uploadedPaths: string[] = [];

    if (images.length === 0) {
      return uploadedPaths;
    }

    for (let i = 0; i < images.length; i++) {
      const result = await uploadFile(images[i], {});
      uploadedPaths.push(result.blobPath);
    }

    return uploadedPaths;
  };

  const createIssue = async () => {
    if (!issueType) {
      showError("Please select an issue type.");
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

    if (images.length > 4) {
      showError("Cannot upload more than 4 images!");
    }

    setSaving(true);

    try {
      const uploadedPaths = await uploadImages();

      const issueCreate: NonprofitCreateIssue = {
        type: issueType,
        title: title,
        description: description,
        status: IssueStatus.PENDING,
        images: uploadedPaths,
      };

      const projectId = router.query.id as string;

      await nonprofitCreateIssue(projectId, issueCreate);
      showInfo("Successfully created issue.");
      await router.replace(urls.pages.nonprofit.issues.index);
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }

    setSaving(false);
  };

  return (
    <Flex height="100%" width="100%">
      {isLoading ? (
        <PageLoadingIndicator />
      ) : (
        <VStack
          flexBasis="850px"
          margin="auto"
          paddingY="40px"
          spacing="20px"
          align="stretch"
        >
          <NextLink href={urls.pages.nonprofit.issues.index} passHref>
            <Button
              alignSelf="flex-start"
              leftIcon={<HiOutlineChevronLeft />}
              variant="secondary"
              padding="0px"
            >
              Maintenance
            </Button>
          </NextLink>
          <VStack
            padding="50px"
            border="1px solid"
            borderColor="border"
            borderRadius="lg"
            backgroundColor="surface"
            align="stretch"
            spacing="20px"
          >
            <Text fontWeight="bold">Category</Text>
            <RadioGroup
              value={issueType}
              onChange={(value) => {
                setIssueType(value as MaintenanceType);
              }}
            >
              <Stack direction="row" spacing="20px">
                {chapterIssueTypes.map((issueType) => (
                  <Radio key={issueType} value={issueType}>
                    {issueType}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Text fontWeight="bold">Title</Text>
            <Input
              value={title}
              maxLength={maxInput}
              placeholder="Enter a short title to summarize your issue"
              onChange={(e) => setTitle(e.target.value)}
            />

            <Text fontWeight="bold">Description</Text>
            <Textarea
              rows={7}
              resize="none"
              value={description}
              maxLength={maxTextArea}
              placeholder="Describe the issue you are having or feature you would like added here"
              onChange={(e) => setDescription(e.target.value)}
            />

            <Text fontWeight="bold">Screenshots (Optional)</Text>
            <VStack
              display={images.length !== 0 ? "flex" : "none"}
              align="start"
            >
              {images.map((image) => (
                <UploadCard
                  key={image.name}
                  image={image}
                  onDelete={(image) => removeImage(image)}
                />
              ))}
            </VStack>
            <Button
              alignSelf="start"
              colorScheme="blue"
              variant="outline"
              onClick={() => fileUploadRef?.current?.click()}
            >
              Upload Files
            </Button>
            <Input
              display="none"
              ref={fileUploadRef}
              type="file"
              accept="image/*"
              onChange={(e) => addImages(e.target.files)}
              multiple
            />
            <Button
              alignSelf="end"
              colorScheme="blue"
              onClick={createIssue}
              isLoading={isSaving}
            >
              Create Issue
            </Button>
          </VStack>
        </VStack>
      )}
    </Flex>
  );
}

export default NonprofitIssueCreationPage;
