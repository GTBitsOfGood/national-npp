import { HStack, Icon, Text } from "@chakra-ui/react";
import { AiOutlineFileImage } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

interface Props {
  image: File;
  onDelete: (image: File) => void;
}

function UploadCard({ image, onDelete }: Props) {
  return (
    <HStack align="center" spacing="10px">
      <HStack spacing="5px">
        <Icon as={AiOutlineFileImage} width="24px" height="24px" />
        <Text>{image.name}</Text>
      </HStack>
      <Icon
        as={IoMdClose}
        color="secondaryText"
        width="24px"
        height="24px"
        _hover={{ cursor: "pointer" }}
        onClick={() => onDelete(image)}
      />
    </HStack>
  );
}

export default UploadCard;
