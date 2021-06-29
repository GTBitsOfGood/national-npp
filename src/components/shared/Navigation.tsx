/* eslint-disable react/no-multi-comp */
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  VStack,
  Image,
} from "@chakra-ui/react";

function Navigation() {
  // Assume that you know this information, nav bar changes based on this information
  const isLoggedIn = true;
  const isChapter = true;
  const isNonprofit = false;
  const npUserName = "liv.2b.girl";
  const nonProftName = "Liv2BGirl";
  const chapterName = "Chapter Name";

  //colors
  const black = "rgba(51, 51, 51, 1)";
  const slate = "rgba(101, 119, 136, 1)";
  const blue = "rgba(0, 105, 202, 1)";

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        maxH={"66px"}
        py="23px"
        px="34px"
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image src="images/small_logo.svg" boxSize="150"/>
          <Flex display={{ base: "none", md: "flex" }} ml={6}>
            <DesktopNav
              isLoggedIn={isLoggedIn}
              isChapter={isChapter}
              isNonprofit={isNonprofit}
            />
          </Flex>
        </Flex>
        {isLoggedIn ? (
          <Flex alignItems={"center"}>
            <Menu>
              <VStack spacing={-2} align="flex-end">
                <Text p={1} fontSize="sm" fontWeight={700} color={black}>
                  {isChapter ? chapterName : nonProftName}
                </Text>
                <Text p={1} fontSize="sm" fontWeight={500} color={slate}>
                  {isChapter ? "Admin" : npUserName}
                </Text>
              </VStack>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
              >
                <Avatar
                  size={"sm"}
                  src={"https://hack4impact.org/brokenLink"}
                />
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
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={blue}
              href={"#"}
              _hover={{
                bg: "rgba(0, 105, 202, 0.5)",
              }}
            >
              Log In
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}

export default Navigation;

const DesktopNav = (props: {
  isLoggedIn: boolean;
  isChapter: boolean;
  isNonprofit: boolean;
}) => {
  // const linkColor = useColorModeValue("gray.600", "gray.200");
  // const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  //colors
  const slate = "rgba(101, 119, 136, 1)";
  const black = "rgba(51, 51, 51, 1)";
  const blue = "rgba(0, 105, 202, 1)";

  let NAV_ITEMS: Array<NavItem> = [];
  if (props.isLoggedIn) {
    if (props.isChapter) {
      NAV_ITEMS = NAV_ITEMS_ADMIN;
    } else {
      NAV_ITEMS = NAV_ITEMS_NON_PROFIT;
    }
  }
  return (
    <Stack direction={"row"} spacing={6} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={slate}
                _hover={{
                  textDecoration: "none",
                  color: black,
                }}
                _active={{
                  fontWeight: 600,
                  textDecoration: "none",
                  color: blue,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && ( // not needed rn, maybe later???
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

// not sure if we will need this in the future ?
const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
      </Stack>
    </Link>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS_NON_PROFIT: Array<NavItem> = [
  {
    label: "My Project",
    href: "/chapter/projects/",
  },
  {
    label: "Maintenance",
    href: "/",
  },
];

const NAV_ITEMS_ADMIN: Array<NavItem> = [
  {
    label: "Projects",
    href: "/chapter/projects/",
  },
  {
    label: "Edit Process",
    href: "/",
  },
  {
    label: "Maintenance",
    href: "/",
  },
];
