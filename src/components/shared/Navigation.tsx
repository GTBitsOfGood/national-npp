import {
  Flex,
  Text,
  Box,
  Avatar,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Logo from "public/images/small_logo.svg";

function Navigation() {
  // Assume that you know this information, nav bar changes based on this information
  const isLoggedIn = true;
  const isChapter = true;
  const isNonprofit = false;
  const npUserName = "liv.2b.girl";
  const nonprofitName = "Liv2BGirl";
  const chapterName = "Chapter Name";

  let NAV_ITEMS: Array<NavItem> = [];
  if (isLoggedIn) {
    NAV_ITEMS = isChapter ? NAV_ITEMS_ADMIN : NAV_ITEMS_NON_PROFIT;
  }

  return (
    <Box>
      <Flex
        bg={"white"}
        color={"gray.600"}
        maxH={"66px"}
        py="23px"
        px="34px"
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Flex flex="1" justify="start">
          <Image src={Logo} width={150} height={150} />
          {isLoggedIn && (isChapter || isNonprofit) ? (
            <Flex display={{ base: "none", md: "flex" }} ml={12}>
              <Stack direction={"row"} spacing={6} align="center">
                {NAV_ITEMS.map((navItem) => (
                  <Box key={navItem.label} placement={"bottom-start"}>
                    <NextLink href={navItem.href}>
                      <Link
                        p={2}
                        fontSize={"sm"}
                        fontWeight={500}
                        color={"slategrey"}
                        _hover={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        _active={{
                          textDecoration: "none",
                          color: "blue.500",
                        }}
                      >
                        {navItem.label}
                      </Link>
                    </NextLink>
                  </Box>
                ))}
              </Stack>
            </Flex>
          ) : null}
        </Flex>
        {isLoggedIn ? (
          <Flex alignItems={"center"}>
            <Menu>
              <VStack spacing={-2} align="flex-end" marginRight={6}>
                <Text p={1} fontSize="sm" fontWeight={700} color={"black.400"}>
                  {isChapter ? chapterName : nonprofitName}
                </Text>
                <Text p={1} fontSize="sm" fontWeight={500} color={"slategrey"}>
                  {isChapter ? "Admin" : npUserName}
                </Text>
              </VStack>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
              >
                <Avatar width="40px" height="40px" />
              </MenuButton>
              <MenuList>
                <MenuItem>Edit Profile</MenuItem>
                <MenuItem>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <NextLink href="/login">
              <Button
                display="inline-flex"
                fontSize="sm"
                fontWeight={600}
                color={"white"}
                bg={"blue.500"}
                _hover={{
                  bg: "blue.400",
                }}
              >
                Log In
              </Button>
            </NextLink>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}

export default Navigation;

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS_NON_PROFIT: Array<NavItem> = [
  {
    label: "My Project",
    href: "/chapter/projects",
  },
  {
    label: "Maintenance",
    href: "/",
  },
];

const NAV_ITEMS_ADMIN: Array<NavItem> = [
  {
    label: "Projects",
    href: "/chapter/projects",
  },
  {
    label: "Maintenance",
    href: "/",
  },
];
