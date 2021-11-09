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
import React from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { dateToMMDDYYYY } from "src/utils/dates";
import { IssueStatus, MaintenanceType } from "src/utils/types";
import urls from "src/utils/urls";
//import { linkToUploadedFile } from "src/utils/uploaded-files";

function NonprofitIssueViewPage() {
  const userExample = {
    name: "First Last",
    email: "example@gmail.com",
    phoneNum: "XXX-XXX-XXXX",
  };
  const sampleScreenshot1 = {
    blobPath: "https://i.ibb.co/sHNQ84Y/pics.jpg",
    name: "screenshot 1",
  };
  const sampleScreenshot2 = {
    blobPath: "https://i.ibb.co/sHNQ84Y/pics.jpg",
    name: "screenshot 2",
  };
  const issue = {
    _id: "00000",
    title: "Issue Name",
    status: IssueStatus.CLOSED,
    createdAt: new Date(),
    updatedAt: new Date(),
    finishedAt: new Date(),
    reviewer: userExample,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.",
    type: MaintenanceType.BUG_FIXES,
    images: [sampleScreenshot1, sampleScreenshot2],
  };
  const hasReviewer = true;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex height="100%" width="100%">
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
            {issue.status == IssueStatus.CLOSED && (
              <Text
                fontSize="sm"
                fontWeight="bold"
                padding="5px 10px"
                color="#79c099"
                bgColor="#ecf6f0"
                borderRadius="md"
              >
                Complete
              </Text>
            )}
            {issue.status == IssueStatus.PENDING && (
              <Text
                fontSize="sm"
                fontWeight="bold"
                padding="5px 10px"
                color="#cf7f21"
                bgColor="#f0eae3"
                borderRadius="md"
              >
                {issue.status}
              </Text>
            )}
            {issue.status == IssueStatus.CLOSED && (
              <Text fontSize="sm" color="#657788">
                Issued {dateToMMDDYYYY(issue.createdAt)}, Closed{" "}
                {dateToMMDDYYYY(issue.finishedAt)}
              </Text>
            )}
            {issue.status == IssueStatus.PENDING && (
              <Text fontSize="sm" color="#657788">
                Issued {dateToMMDDYYYY(issue.createdAt)}
              </Text>
            )}
          </HStack>
          {issue.status == IssueStatus.PENDING && (
            <Link href={urls.pages.nonprofit.issues.index} passHref={true}>
              <Button variant="secondary" fontSize="sm">
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
                {issue.images.map((image) => (
                  <VStack key={image.name} align="start">
                    {/* <Image boxSize="100px" src={image.blobPath} /> */}

                    <Image
                      boxSize="100px"
                      src={image.blobPath}
                      //src={linkToUploadedFile(image.blobPath)}
                      onClick={onOpen}
                      cursor="pointer"
                    />

                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent margin="auto">
                        <ModalBody>
                          <Image boxSize="100%" src={image.blobPath} />
                          {/* <Image boxSize="100%" src={linkToUploadedFile(image.blobPath)}/> */}
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                    <Text fontSize="xx-small">{image.name}</Text>
                  </VStack>
                ))}
              </HStack>

              <HStack />
            </VStack>
            {hasReviewer && (
              <VStack align="stretch">
                <Text fontSize="sm" fontWeight="bold">
                  Who To Contact
                </Text>
                <Text fontSize="sm">{issue.reviewer.name}</Text>
                <Text fontSize="sm">{issue.reviewer.email}</Text>
                <Text fontSize="sm">{issue.reviewer.phoneNum}</Text>
              </VStack>
            )}
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
}

export default NonprofitIssueViewPage;
