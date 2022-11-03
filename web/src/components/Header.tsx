import React from "react";
import { Header as MTHeader, Group, ThemeIcon, Title, Divider, MultiSelect} from '@mantine/core'
import SearchBar from "./SearchBar";
import { IconMoodHappy } from "@tabler/icons";
import DarkModeToggle from "./DarkModeToggle";



const Header = () => {
  return (
    <MTHeader height={100}>
      <Group position="apart" sx={{ height: "100%" }} mx="xl">
        <Group position="left">
          <ThemeIcon variant="filled" radius="md" size="xl" color="green">
            <IconMoodHappy />
          </ThemeIcon>
          <Title>My News</Title>
        </Group>
        <Group position="left">
          <SearchBar />
          <Divider orientation="vertical"/>
          <DarkModeToggle />
        </Group>
      </Group>
    </MTHeader>
  );
};

export default Header;
