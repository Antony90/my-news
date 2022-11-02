import { Navbar, UnstyledButton, Group, Text, ThemeIcon, MantineColor } from "@mantine/core";
import { IconGraph, IconNews, IconUserCheck } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
  label: string,
  path: string,
  icon: any,
  iconColor: MantineColor
}

const NavItem: React.FC<NavItemProps> = ({ label, path, icon, iconColor }) => {
  const navigate = useNavigate();
  return (
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
        onClick={() => navigate(path)}
      >
        <Group>
          <ThemeIcon variant="filled" size="lg" color={iconColor}>
            {icon}
          </ThemeIcon>
          <Text>{label}</Text>
        </Group>
      </UnstyledButton>
    </Navbar.Section>
  )
};

const NavBar = () => {
  return (
    <Navbar
      p="xs"
      width={{
        md: 180,
        sm: 80,
      }}
    >
      <NavItem label="Articles" path="/" icon={<IconNews />} iconColor="yellow"/>
      <NavItem label="Analytics" path="/analytics" icon={<IconGraph />} iconColor="red"/>
      <NavItem label="My Feed" path="/feeds" icon={<IconUserCheck />} iconColor="blue"/>
    </Navbar>
  );
};

export default NavBar;
