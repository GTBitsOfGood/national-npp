import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import Image from "next/image";
import { linkToUploadedFile } from "src/utils/uploaded-files";

interface Props {
  imagePath: string;
  isOpen: boolean;
  onClose: () => void;
}

function ImageModal({ imagePath, isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent backgroundColor="transparent" boxShadow="none">
        <ModalBody>
          <Center>
            <Image
              width={500}
              height={500}
              src={linkToUploadedFile(imagePath)}
            />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ImageModal;
