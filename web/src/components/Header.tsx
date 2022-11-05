import React, { useEffect, useState } from "react";
import {
  Header as MTHeader,
  Group,
  ThemeIcon,
  Title,
  Divider,
  MultiSelect,
  Switch,
  RangeSlider,
} from "@mantine/core";
import SearchBar from "./SearchBar";
import { IconMoodHappy, IconMoodSad } from "@tabler/icons";
import DarkModeToggle from "./DarkModeToggle";
import { useAppDispatch } from "../store/hooks";
import { useDebouncedValue } from "@mantine/hooks";
import { setSentimentBounds } from "../store/reducers/filter";

const marks = [
  { value: 50, label: "Neutral" }, // -> displays mark on slider track
];

const Header = () => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const dispatch = useAppDispatch();
  const [[lower, upper]] = useDebouncedValue(rangeValue, 1000);

  useEffect(() => {
    dispatch(setSentimentBounds([
      (lower - 50) / 50, (upper - 50) / 50
    ]));
  }, [lower, upper]);

  return (
    <MTHeader height={100}>
      <Group position="apart" sx={{ height: "100%" }} mx="xl">
        <Group position="left">
          <ThemeIcon variant="filled" radius="md" size="xl" color="green">
            <IconMoodHappy />
          </ThemeIcon>
          <Title>My News</Title>
        </Group>
        <Group position="right">
          <RangeSlider
            mt="xl"
            value={rangeValue}
            onChange={setRangeValue}
            thumbSize={0}
            color="gray"
            sx={{ width: 300 }}
            style={{ marginTop: 0 }}
            mr="xl"
            defaultValue={[0, 100]}
            marks={marks}
            scale={(v: number) => (v - 50) / 50}
            thumbChildren={[
              <ThemeIcon color="red" radius="xl">
                <IconMoodSad size={30} key="1" />
              </ThemeIcon>,
              <ThemeIcon color="green" radius="xl">
                <IconMoodHappy size={30} key="2" />
              </ThemeIcon>,
            ]}
            styles={(theme) => ({
              thumb: { borderWidth: 0, padding: 0 },
              bar: {
                backgroundImage: theme.fn.linearGradient(
                  90,
                  "#f00",
                  "#ccc",
                  "#0f0"
                ),
              },
            })}
          />
          <SearchBar />
          <Divider orientation="vertical" />
          <DarkModeToggle />
        </Group>
      </Group>
    </MTHeader>
  );
};

export default Header;
