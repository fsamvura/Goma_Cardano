import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarItem {
  slug: string;
  name: string;
}

interface SidebarProps {
  items: SidebarItem[];
  modulePath: string;
  selected: number;
}

const Sidebar = ({ items, modulePath, selected }: SidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<SidebarItem | null>(items[selected]);
  const navBackground = useColorModeValue("white", "theme.lightGray");
  const router = useRouter();

  useEffect(() => {
    if (items.length > selected) {
      setSelectedItem(items[selected]);
    }
  }, [items, selected]);

  // Check if the current path is the module path without an item slug
  useEffect(() => {
    if (router.asPath === modulePath && items.length > 0) {
      router.push(`${modulePath}/${items[0].slug}`);
    }
  }, [router.asPath]);

  return (
    <Flex>
      <Box
        bg={navBackground}
        borderRight="1px solid"
        w="60"
        minH="100vh"
        pos="relative"
        zIndex={10}
        sx={{
          "@media screen and (max-width: 480px)": {
            position: "absolute",
            transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease-in-out",
            width: "100%",
          },
        }}
      >
        <Box p="4">
          <IconButton
            aria-label="Close menu"
            icon={<CloseIcon />}
            display={{ md: "none" }}
            onClick={onClose}
            variant="outline"
            colorScheme="whiteAlpha"
            size="sm"
          />
        </Box>
        <Stack spacing={4}>
          {items.map((item) => (
            <Link key={item.slug} href={`${modulePath}/${item.slug}`}>
              <Box
                p="4"
                // rounded="md"
                _hover={{
                  // bg: useColorModeValue("theme.lightGray", "theme.dark"),
                  bg: "theme.lightGray",
                  color: "white",
                  cursor: "pointer",
                }}
                bg={selectedItem?.name === item.name ? "theme.blue" : "none"}
                color={selectedItem?.name === item.name ? "theme.dark" : "none"}
                // borderRadius="md"
                // border="1px solid"
              >
                <Text fontWeight="bold" fontFamily={["Miriam Libre"]}>{item.name}</Text>
              </Box>
            </Link>
          ))}
        </Stack>
      </Box>
      <Box p="4" flex="1">
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            display={{ md: "none" }}
            onClick={onOpen}
            variant="outline"
            colorScheme="whiteAlpha"
            size="sm"
          />
      </Box>
    </Flex>
  );
};

export default Sidebar;