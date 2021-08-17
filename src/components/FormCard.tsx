import {
  Heading,
  Text,
  HStack,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { dateToMMDDYYYY } from "src/utils/dates";

function FormCard(props: { name: string; updatedAt: Date }) {
  const { name, updatedAt } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      borderBottom="1px solid #EBEEF1"
      p="40px 60px"
      justify="space-between"
    >
      <HStack spacing="50px">
        <Flex width="150px">
          <Heading
            fontSize="medium"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {name}
          </Heading>
        </Flex>
        <Text fontSize="xs" color="#808080">
          Last Edited: {dateToMMDDYYYY(updatedAt)}
        </Text>
      </HStack>
      <HStack fontSize="12px" color="#1974d2" spacing="50px">
        <HStack>
          <FiEdit2 size="1.5em" />
          <Link>Edit Form</Link>
        </HStack>
        <HStack>
          <RiDeleteBin5Line size="1.5em" />
          <Link onClick={onOpen}>Delete Form</Link>
          <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
            <ModalOverlay />
            <ModalContent borderColor="#657788" border="1px">
              <ModalHeader>Delete Form</ModalHeader>
              <ModalCloseButton />
              <ModalBody fontSize="small">
                Please confirm that you would like to delete {name}.
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={2}>
                  Delete
                </Button>
                <Button variant="ghost" color="#1974d2" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
      </HStack>
    </Flex>
  );
}

export default FormCard;
