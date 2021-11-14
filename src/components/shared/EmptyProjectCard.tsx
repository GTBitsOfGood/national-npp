import { Text, VStack } from "@chakra-ui/react";

function EmptyProjectCard() {
  return (
    <VStack
      height="120px"
      width="100%"
      borderRadius="md"
      border="solid"
      borderColor="border"
      borderStyle="dashed"
      padding="20px"
      justify="center"
      align="center"
      backgroundColor="inherit"
    >
      <Text>No projects to see here.</Text>
    </VStack>
  );
}

export default EmptyProjectCard;
