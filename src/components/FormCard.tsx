import {
  Box,
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
} from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
function FormCard(props: { name: string; updatedAt: Date }) {
  const { name, updatedAt } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  function dateToString(updatedAt: Date) {
    const dateOfMonth = `${updatedAt.getDate().toString().slice(-2)}`;
    const month = `${(updatedAt.getMonth() + 1).toString().slice(-2)}`;
    const year = updatedAt.getFullYear();

    return `${month}/${dateOfMonth}/${year}`;
  }

  return (
    <Box borderBottom="1px" borderColor="#EBEEF1">
      <HStack padding="30px 50px 30px 50px" justifyContent="space-between">
        <HStack spacing="50px">
          <Box width="150px">
            <Heading fontSize="medium">{name}</Heading>
          </Box>
          <Box>
            <Text fontSize="12px" color="#808080">
              Last Edited: {dateToString(updatedAt)}
            </Text>
          </Box>
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
      </HStack>
    </Box>
  );
}

export default FormCard;
