import { Button } from "@chakra-ui/button";
import { Heading, Stack, Text, VStack, Link } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Flex } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import { HiOutlineChevronLeft } from "react-icons/hi";
import urls from "src/utils/urls";

function NonprofitIssueCreationPage() {
  return (
    <Flex height="100%" width="100%">
      <Flex flexBasis="1000px" margin="auto">
        <VStack spacing={10} marginY={50}>
          <Link
            alignSelf="flex-start"
            href={urls.pages.nonprofit.issues}
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
            <RadioGroup>
              <Stack direction="row" spacing={5}>
                <Radio fontSize="lg" value="1">
                  Bug Fixes
                </Radio>
                <Radio fontSize="lg" value="2">
                  New Features
                </Radio>
              </Stack>
            </RadioGroup>
            <Text fontSize="md">Title</Text>
            <Textarea placeholder="Enter a short title to describe the issue" />

            <Text fontSize="md">Description</Text>
            <Textarea placeholder="Enter a brief description of the issue with your software. We will do our best to replicate it on our end, and then reach out if we have any questions or have suggestions for how to fix it on your end." />

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
            <Button alignSelf="end" colorScheme="blue">
              Submit Form
            </Button>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default NonprofitIssueCreationPage;
