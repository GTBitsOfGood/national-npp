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

interface Props {
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
}

function ConfirmAlert(props: Props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent w={{ base: "70%", md: "400px" }}>
        <ModalHeader fontSize="2xl">{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg">{props.description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" mr="10px" onClick={props.onConfirm}>
            {props.confirmText}
          </Button>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmAlert;
