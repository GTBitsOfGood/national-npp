import { Box, Heading, Text, Link, HStack, Icon } from "@chakra-ui/react";
//import React, { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { IoIosGlobe } from "react-icons/io";

const cardItems = [
  {
    name: "University of Washington",
    email: "example1@gmail.com",
    projectTypes: ["Website", "Mobile"],
    website: "website1.com",
    facebook: "https://facebook.com",
    address: "Washington 1",
  },
  {
    name: "University of Washington 2",
    email: "example2@gmail.com",
    projectTypes: ["Website"],
    website: "website2.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    address: "Washington 2",
  },
  {
    name: "University of Washington 3",
    email: "example3@gmail.com",
    projectTypes: ["Website", "Mobile"],
    facebook: "https://facebook.com",
    website: "website3.com",
    instagram: "hello",
    address: "Washington 3",
  },
  {
    name: "University of Washington 4",
    email: "example4@gmail.com",
    projectTypes: ["Website", "Mobile", "Mobile 2"],
    facebook: "https://facebook.com",
    website: "website4.com",
    address: "Washington 4",
  },
  {
    name: "University of Washington5 ",
    email: "example5@gmail.com",
    projectTypes: ["Website", "Mobile", "Mobile 2"],
    facebook: "https://facebook.com",
    website: "website5.com",
    address: "Washington 5",
    instagram: "https://instagram.com",
  },
];

const CircleIcon = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

function ChapterCard() {
  // const [isSelected, setSelected] = useState(false);

  // const selected = () => setSelected(true);

  return cardItems.map((cardItem) => (
    <Box
      key={cardItem.name}
      w={60}
      h={40}
      border="1px"
      borderRadius="15px"
      borderColor="blackAlpha.600"
      margin="4"
      _hover={{ backgroundColor: "rgb(240, 248, 255)" }}
      backgroundColor="white"
      // onClick={selected}
    >
      <Box marginLeft="4" marginTop="5">
        <Heading fontSize="medium" color="black" marginBottom="2">
          {cardItem.name}
        </Heading>
        <HStack spacing="0.5">
          <Text fontSize="small" color="gray.500">
            {cardItem.address}
          </Text>
          <CircleIcon boxSize={1} color="blue.600" />
          <Link
            fontSize="small"
            color="blue.600"
            href={"mailto:" + cardItem.email}
          >
            Contact
          </Link>
        </HStack>
        <Text fontSize="small" color="gray.500">
          {cardItem.projectTypes.join(", ")}
        </Text>
        <HStack />
        <HStack spacing="2" marginTop="10">
          <Link href={cardItem.website}>
            {cardItem.website ? <IoIosGlobe /> : ""}
          </Link>
          <Link href={cardItem.instagram}>
            {cardItem.instagram ? <FiInstagram /> : ""}
          </Link>
          <Link href={cardItem.facebook}>
            {cardItem.facebook ? <AiFillFacebook /> : ""}
          </Link>
        </HStack>
      </Box>
    </Box>
  ));
}
export default ChapterCard;
