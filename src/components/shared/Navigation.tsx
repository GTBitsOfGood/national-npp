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
} from "@chakra-ui/react";

function Navigation() {
  // Assume that you know this information, nav bar changes based on this information
  const isLoggedIn = true;
  const isChapter = true;
  const isNonprofit = false;

  return (
    // <Flex height="70px" borderBottom="solid">
    //   <Text>Navigation</Text>
    // </Flex>
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
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
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
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
              bg={"rgba(0, 105, 202, 1)"}
              href={"#"}
              _hover={{
                bg: "pink.300",
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
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  let NAV_ITEMS: Array<NavItem> = [];
  if (props.isLoggedIn) {
    if (props.isChapter) {
      NAV_ITEMS = NAV_ITEMS_ADMIN;
    } else {
      NAV_ITEMS = NAV_ITEMS_NON_PROFIT;
    }
  }
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
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
    href: "#",
  },
  {
    label: "Maintenance",
    href: "#",
  },
];

const NAV_ITEMS_ADMIN: Array<NavItem> = [
  {
    label: "Projects",
    href: "#",
  },
  {
    label: "Edit Process",
    href: "#",
  },
  {
    label: "Maintenance",
    href: "#",
  },
];
