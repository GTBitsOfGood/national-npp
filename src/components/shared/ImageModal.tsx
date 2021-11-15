import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
} from "@chakra-ui/react";
// import Image from "next/image";
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
          <Box>
            <Image
              src={imagePath}
              //src={linkToUploadedFile(blobPath)}/>
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ImageModal;
