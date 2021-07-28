import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

function ConfirmAlert(props: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={{ base: "20rem", md: "35rem" }}>
        <ModalHeader fontSize="2xl">Cancel Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to cancel this project?</Text>
          <Text paddingBottom={3}>
            All responses will be permanently deleted.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3}>
            Cancel Project
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmAlert;
