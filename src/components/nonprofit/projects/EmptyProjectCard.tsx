import { Text, VStack } from "@chakra-ui/react";

interface Props {
  active: boolean;
}

function EmptyProjectCard({ active }: Props) {
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
      <Text>You have no {active ? "active " : "closed "} projects.</Text>
    </VStack>
  );
}

export default EmptyProjectCard;
