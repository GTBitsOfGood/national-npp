import {
  Button,
  Flex,
  VStack,
  Text,
  HStack,
  Image,
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
import { nonprofitGetUser } from "src/actions/User";
import LoadingIndicator from "src/components/shared/LoadingIndicator";
import { dateToMMDDYYYY } from "src/utils/dates";
import { showError } from "src/utils/notifications";
import { Issue, IssueStatus, MaintenanceType, User } from "src/utils/types";
import urls from "src/utils/urls";

function NonprofitIssueViewPage() {
  const [issue, setIssue] = useState<Issue>();
  const router = useRouter();
  const [projectId, setProjectId] = useState("617ea71c069ce109e2ae9f83");
  const [isLoading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeIssue = async () => {
    const issueId = router.query.id as string;
    try{
    const issueClosed = await nonprofitUpdateIssue(issueId, projectId, {
      status: IssueStatus.CLOSED,
      finishedAt: new Date(),
    });} catch (e){
      showError((e as Error).message)
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    async function loadIssue() {
      let dbIssue;
      try{
        const issueId = router.query.id as string;
        dbIssue = await nonprofitGetIssue(issueId, projectId);
      } catch(e){
        const error = e as Error;
        showError(error.message);
      }
        if (!dbIssue) {
          showError("Issue does not exist!");
          throw new Error("Issue does not exist!")
        }
        setIssue(dbIssue);  
    }

    setLoading(true);
    loadIssue()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router]);
  
  return (
    <Flex height="100%" width="100%">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <VStack
          spacing="15px"
          align="stretch"
          margin="auto"
          maxW={{ base: "400px", md: "700px" }}
          //padding={{ base: "40px", md: "70px" }}
        >
          <Text align="start" marginLeft={-6}>
            <Link href={urls.pages.nonprofit.issues.index} passHref={true}>
              <Button
                leftIcon={<HiOutlineChevronLeft />}
                variant="secondary"
                fontSize="md"
              >
                Maintenance
              </Button>
            </Link>
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {issue.title}
          </Text>
          <HStack
            border="1px solid"
            borderColor="border"
            borderRadius="lg"
            backgroundColor="surface"
            align="stretch"
            paddingY={3}
            justifyContent="space-between"
            paddingX={6}
            //spacing={10}
          >
            <HStack spacing={2}>
              <Text
                fontSize="sm"
                fontWeight="bold"
                padding="5px 10px"
                color={
                  issue.status == IssueStatus.CLOSED ? "#79c099" : "#cf7f21"
                }
                bgColor={
                  issue.status == IssueStatus.CLOSED ? "#ecf6f0" : "#f0eae3"
                }
                borderRadius="md"
              >
                {issue.status == IssueStatus.CLOSED ? "Complete" : "Pending"}
              </Text>
              <HStack spacing={1}>
                <Text fontSize="sm" color="#657788">
                  Issued {dateToMMDDYYYY(issue.createdAt)}
                </Text>
                {issue.status == IssueStatus.CLOSED && (
                  <Text fontSize="sm" color="#657788">
                    , Closed {dateToMMDDYYYY(issue.finishedAt)}
                  </Text>
                )}
              </HStack>
            </HStack>
            {issue.status == IssueStatus.PENDING && (
              <Link href={urls.pages.nonprofit.issues.index} passHref={true}>
                <Button variant="secondary" fontSize="sm" onClick={closeIssue}>
                  Cancel Request
                </Button>
              </Link>
            )}
          </HStack>

          <VStack
            maxW="1000px"
            border="1px solid"
            borderColor="border"
            borderRadius="lg"
            backgroundColor="surface"
            align="stretch"
          >
            <VStack align="stretch" p="20px" spacing={5}>
              <VStack align="stretch">
                <Text fontSize="sm" fontWeight="bold">
                  Issue #
                </Text>
                <Text fontSize="sm">{issue._id}</Text>
              </VStack>
              <VStack align="stretch">
                <Text fontSize="sm" fontWeight="bold">
                  Issue Type
                </Text>
                <Text fontSize="sm">{issue.type}</Text>
              </VStack>
              <VStack align="stretch">
                <Text fontSize="sm" fontWeight="bold">
                  Description
                </Text>
                <Text fontSize="sm">{issue.description}</Text>
              </VStack>
              <VStack align="stretch">
                <Text fontSize="sm" fontWeight="bold">
                  Screenshots
                </Text>
                <HStack>
                  {issue.images.map((image, index) => (
                    <VStack key={index} align="start">
                      {/* <Image boxSize="100px" src={image.blobPath} /> */}

                      <Image
                        boxSize="100px"
                        src={image}
                        //src={linkToUploadedFile(image.blobPath)}
                        onClick={onOpen}
                        cursor="pointer"
                      />

                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent margin="auto">
                          <ModalBody>
                            <Image boxSize="100%" src={image} />
                            {/* <Image boxSize="100%" src={linkToUploadedFile(image.blobPath)}/> */}
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                      <Text fontSize="xx-small">{index}</Text>
                    </VStack>
                  ))}
                </HStack>

                <HStack />
              </VStack>
              {issue.reviewer && (
                <VStack align="stretch">
                  <Text fontSize="sm" fontWeight="bold">
                    Who To Contact
                  </Text>
                  
                  <Text fontSize="sm">{(issue.reviewer as User).name}</Text>
                  <Text fontSize="sm">{(issue.reviewer as User).email}</Text>
                  <Text fontSize="sm">{(issue.reviewer as User).phoneNum}</Text>
                </VStack>
              )}
            </VStack>
          </VStack>
        </VStack>
      )}
    </Flex>
  );
}

export default NonprofitIssueViewPage;
