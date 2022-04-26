import {
  Flex,
  Box,
  Center,
  Avatar,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  IconButton,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
import NextLink from "next/link";
import Logo from "public/images/small_logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { showError } from "src/utils/notifications";
import { Role } from "src/utils/types";
import urls from "src/utils/urls";

function Navigation() {
  const [session, isLoading] = useSession();
  if (isLoading) return null;
  const user = session?.user;

  const getNavItems = () => {
    if (user?.roles.includes(Role.NATIONAL_ADMIN)) {
      return natlAdminNavItems;
    } else if (user?.chapter) {
      return chapterNavItems;
    } else {
      return nonprofitNavItems;
    }
  };
  const navItems = getNavItems();

  const logOut = () => {
    signOut().catch((e) => {
      const error = e as Error;
      showError(error.message);
    });
  };

  return (
    <Flex
      bgColor="white"
      color="secondaryText"
      maxH="70px"
      padding="30px 30px"
      borderBottom="1px solid"
      borderColor="border"
      align="center"
    >
      <Flex
        flex="1"
        justify={{ base: "space-between", md: "start" }}
        align="center"
      >
        {user && (
          <Menu>
            <MenuButton
              display={{ base: "flex", md: "none" }}
              as={IconButton}
              aria-label="Options"
              icon={<GiHamburgerMenu />}
              variant="outline"
            />
            <MenuList display={{ base: "block", md: "none" }}>
              <MenuGroup>
                {navItems.map((navItem) => (
                  <NextLink key={navItem.label} href={navItem.href} passHref>
                    <MenuItem>{navItem.label}</MenuItem>
                  </NextLink>
                ))}
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <NextLink
                  href={
                    user.chapter
                      ? urls.pages.chapter.profile
                      : urls.pages.nonprofit.profile
                  }
                >
                  <MenuItem>My Profile</MenuItem>
                </NextLink>
                <MenuItem onClick={logOut}>Sign Out</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
        <NextLink href={urls.pages.home} passHref>
          <Center width="150px" _hover={{ cursor: "pointer" }}>
            <Image src={Logo} />
          </Center>
        </NextLink>
        {user && (
          <Flex display={{ base: "none", md: "flex" }} ml="80px">
            <Stack direction="row" spacing="50px" align="center">
              {navItems.map((navItem) => (
                <Box key={navItem.label} placement="bottom-start">
                  <NextLink href={navItem.href}>
                    <Link
                      fontSize="sm"
                      fontWeight="medium"
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
      {user ? (
        <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
            >
              <Avatar width="40px" height="40px" />
            </MenuButton>
            <MenuList>
              <NextLink
                href={
                  user.chapter
                    ? urls.pages.chapter.profile
                    : urls.pages.nonprofit.profile
                }
              >
                <MenuItem>My Profile</MenuItem>
              </NextLink>
              <MenuItem onClick={logOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      ) : (
        <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row">
          <NextLink href={urls.pages.login}>
            <Button variant="primary" fontSize="sm">
              Log In
            </Button>
          </NextLink>
        </Stack>
      )}
    </Flex>
  );
}

export default Navigation;

interface NavItem {
  label: string;
  href: string;
}

const nonprofitNavItems: Array<NavItem> = [
  {
    label: "Projects",
    href: urls.pages.nonprofit.projects.index,
  },
  {
    label: "Maintenance",
    href: urls.pages.nonprofit.issues.index,
  },
];

const chapterNavItems: Array<NavItem> = [
  {
    label: "Projects",
    href: urls.pages.chapter.projects.index,
  },
  {
    label: "Maintenance",
    href: "/",
  },
];

const natlAdminNavItems: Array<NavItem> = [
  {
    label: "Projects",
    href: "/admin/projects",
  },
  {
    label: "Organizations",
    href: "/admin/orgs",
  },
];
