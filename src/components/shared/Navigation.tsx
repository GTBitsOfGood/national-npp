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
  IconButton,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Logo from "public/images/small_logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import urls from "src/utils/urls";

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
        color="secondaryText"
        maxH={"66px"}
        py="23px"
        px="34px"
        borderBottom={1}
        borderStyle={"solid"}
        borderColor="border"
        align={"center"}
      >
        <Flex
          flex="1"
          justify={{ base: "space-between", md: "start" }}
          align="center"
        >
          {isLoggedIn && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GiHamburgerMenu />}
                variant="outline"
                display={{ base: "flex", md: "none" }}
              />
              <MenuList display={{ base: "block", md: "none" }}>
                <MenuGroup>
                  {NAV_ITEMS.map((navItem, index) => (
                    <NextLink key={index} href={navItem.href} passHref>
                      <MenuItem as={Link}>{navItem.label}</MenuItem>
                    </NextLink>
                  ))}
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <NextLink
                    href={
                      isChapter
                        ? urls.pages.chapter.profile
                        : urls.pages.nonprofit.profile
                    }
                  >
                    <MenuItem>My Profile</MenuItem>
                  </NextLink>
                  <MenuItem>Sign Out</MenuItem>
                  <MenuItem minH="40px">
                    <Avatar width="20px" height="20px" marginRight="2px" />
                    <Text
                      p={1}
                      fontSize="sm"
                      fontWeight={700}
                      color="primaryText"
                    >
                      {isChapter ? chapterName : nonprofitName}
                    </Text>
                    <Text
                      p={1}
                      fontSize="sm"
                      fontWeight={500}
                      color="secondaryText"
                    >
                      {isChapter ? "Admin" : npUserName}
                    </Text>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          )}
          <Image src={Logo} width={150} height={150} />
          {isLoggedIn && (isChapter || isNonprofit) && (
            <Flex display={{ base: "none", md: "flex" }} ml={12}>
              <Stack direction={"row"} spacing={6} align="center">
                {NAV_ITEMS.map((navItem) => (
                  <Box key={navItem.label} placement={"bottom-start"}>
                    <NextLink href={navItem.href}>
                      <Link
                        p={2}
                        fontSize={"sm"}
                        fontWeight={500}
                        color="secondaryText"
                        _hover={{
                          textDecoration: "none",
                          color: "primary",
                        }}
                        _active={{
                          textDecoration: "none",
                          color: "primary",
                        }}
                      >
                        {navItem.label}
                      </Link>
                    </NextLink>
                  </Box>
                ))}
              </Stack>
            </Flex>
          )}
        </Flex>

        {isLoggedIn ? (
          <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
            <Menu>
              <VStack spacing={-2} align="flex-end" marginRight={6}>
                <Text p={1} fontSize="sm" fontWeight={700}>
                  {isChapter ? chapterName : nonprofitName}
                </Text>
                <Text
                  p={1}
                  fontSize="sm"
                  fontWeight={500}
                  color="secondaryText"
                >
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
                <NextLink
                  href={
                    isChapter
                      ? urls.pages.chapter.profile
                      : urls.pages.nonprofit.profile
                  }
                >
                  <MenuItem>My Profile</MenuItem>
                </NextLink>

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
            <NextLink href={urls.pages.login}>
              <Button
                variant="primary"
                display="inline-flex"
                fontSize="sm"
                fontWeight={600}
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
    label: "Projects",
    href: urls.pages.nonprofit.projects.index,
  },
  {
    label: "Maintenance",
    href: "/",
  },
];

const NAV_ITEMS_ADMIN: Array<NavItem> = [
  {
    label: "Projects",
    href: urls.pages.chapter.projects.index,
  },
  {
    label: "Maintenance",
    href: "/",
  },
];
