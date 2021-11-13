import {
  Box,
  Button,
  Flex,
  Image,
  VStack,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { nonprofitGetIssue, nonprofitUpdateIssue } from "src/actions/Issue";
import LoadingIndicator from "src/components/shared/LoadingIndicator";
import { dateToMMDDYYYY } from "src/utils/dates";
import { showError } from "src/utils/notifications";
import { Issue, IssueStatus, User } from "src/utils/types";
import urls from "src/utils/urls";
// import Image from "next/image";

function NonprofitIssueViewPage() {
  const [issue, setIssue] = useState<Issue>();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const reviewer = issue?.reviewer as User;

  const closeIssue = async () => {
    const projectId = router.query.id as string;
    const issueId = router.query.issueId as string;

    try {
      await nonprofitUpdateIssue(issueId, projectId, {
        status: IssueStatus.CLOSED,
        finishedAt: new Date(),
      });
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (!router.isReady) {
      return;
    }

    async function getIssue() {
      try {
        const projectId = router.query.id as string;
        const issueId = router.query.issueId as string;

        const issue = await nonprofitGetIssue(issueId, projectId);

        if (!issue) {
          showError("Issue does not exist!");
          await router.replace(urls.pages.nonprofit.issues.index);
          return;
        }

        setIssue(issue);
      } catch (e) {
        const error = e as Error;
        showError(error.message);
      }
    }

    getIssue()
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        const error = e as Error;
        showError(error.message);
      });
  }, [router]);

  return (
    <Flex height="100%" width="100%">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <VStack
          align="stretch"
          margin="auto"
          flexBasis="850px"
          padding="40px 20px"
          spacing="20px"
        >
          <Link href={urls.pages.nonprofit.issues.index} passHref>
            <Button
              leftIcon={<HiOutlineChevronLeft />}
              variant="secondary"
              padding="0px"
              alignSelf="start"
            >
              Maintenance
            </Button>
          </Link>
          <HStack
            border="1px solid"
            borderColor="border"
            borderRadius="lg"
            backgroundColor="surface"
            align="stretch"
            justifyContent="space-between"
            padding="15px 30px"
          >
            <HStack spacing="20px">
              <Text
                fontWeight="bold"
                padding="5px 10px"
                color={
                  issue?.status == IssueStatus.CLOSED ? "#79c099" : "#cf7f21"
                }
                bgColor={
                  issue?.status == IssueStatus.CLOSED ? "#ecf6f0" : "#f0eae3"
                }
                borderRadius="md"
              >
                {issue?.status == IssueStatus.CLOSED ? "Complete" : "Pending"}
              </Text>
              <HStack>
                {issue?.createdAt && (
                  <Text color="secondaryText">
                    Issued {dateToMMDDYYYY(new Date(issue.createdAt))},
                  </Text>
                )}
                {issue?.finishedAt && (
                  <Text color="secondaryText">
                    Closed {dateToMMDDYYYY(new Date(issue.finishedAt))}
                  </Text>
                )}
              </HStack>
            </HStack>
            {!issue?.finishedAt && (
              <Button variant="secondary" onClick={closeIssue}>
                Close Issue
              </Button>
            )}
          </HStack>

          <VStack
            border="1px solid"
            borderColor="border"
            borderRadius="lg"
            backgroundColor="surface"
            align="stretch"
            padding="30px"
            spacing="20px"
          >
            <VStack align="stretch">
              <Text fontWeight="bold">Issue ID</Text>
              <Text>{issue?._id}</Text>
            </VStack>
            <VStack align="stretch">
              <Text fontWeight="bold">Title</Text>
              <Text>{issue?.title}</Text>
            </VStack>
            <VStack align="stretch">
              <Text fontWeight="bold">Description</Text>
              <Text>{issue?.description}</Text>
            </VStack>
            <VStack align="stretch">
              <Text fontWeight="bold">Type</Text>
              <Text>{issue?.type}</Text>
            </VStack>
            {issue?.images && (
              <VStack align="stretch">
                <Text fontWeight="bold">Screenshots</Text>
                <HStack>
                  {issue.images.map((image) => (
                    <VStack key={image} align="start">
                      <Box
                        width="150px"
                        height="150px"
                        onClick={onOpen}
                        cursor="pointer"
                      >
                        <Image
                          src={image}
                          //src={linkToUploadedFile(image.blobPath)}
                        />
                      </Box>

                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent margin="auto">
                          <ModalBody>
                            <Image
                              src={image}
                              //src={linkToUploadedFile(image.blobPath)}/>
                            />
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                    </VStack>
                  ))}
                </HStack>
                <HStack />
              </VStack>
            )}
            {reviewer && (
              <VStack align="stretch">
                <Text fontWeight="bold">Reviewer</Text>
                <Text>{reviewer.name}</Text>
                <Text>{reviewer.email}</Text>
                <Text>{reviewer.phoneNum}</Text>
              </VStack>
            )}
          </VStack>
        </VStack>
      )}
    </Flex>
  );
}

export default NonprofitIssueViewPage;
