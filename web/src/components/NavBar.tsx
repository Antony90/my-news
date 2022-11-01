import { Navbar, UnstyledButton, Group, Text, ThemeIcon, MantineColor } from "@mantine/core";
import { IconGraph, IconNews, IconUserCheck } from "@tabler/icons";
import React from "react";

interface NavItemProps {
  icon: any,
  label: string,
  iconColor: MantineColor
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, iconColor }) => (
  <Navbar.Section pb="sm">
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon variant="light" size="lg" color={iconColor}>
          {icon}
        </ThemeIcon>
        <Text>{label}</Text>
      </Group>
    </UnstyledButton>
  </Navbar.Section>
);

const NavBar = () => {
  return (
    <Navbar
      p="xs"
      width={{
        md: 180,
        sm: 80,
      }}
    >
      <NavItem label="Articles" icon={<IconNews />} iconColor="yellow"/>
      <NavItem label="Analytics" icon={<IconGraph />} iconColor="red"/>
      <NavItem label="My Feed" icon={<IconUserCheck />} iconColor="blue"/>
    </Navbar>
  );
};

export default NavBar;
