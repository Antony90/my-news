import { Kbd, MultiSelect } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconCross, IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import {
  setTags as setFilterTags,
  setSearch as setFilterSearch,
  setLoading,
} from "../store/reducers/filter";

const filterLabels = [
  { label: "Top stories", value: "0", group: "Category" },
  { label: "Technology", value: "1", group: "Category" },
  { label: "World", value: "2", group: "Category" },
  { label: "Politics", value: "3", group: "Category" },
  { label: "Business", value: "4", group: "Category" },
  { label: "Entertainment", value: "5", group: "Category" },
  { label: "BBC", value: "BBC", group: "Provider" },
  { label: "Sky News", value: "Sky News", group: "Provider" },
  { label: "Daily Mail", value: "Daily Mail", group: "Provider" },
];

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [dTags] = useDebouncedValue(tags, 500);
  const [dSearch] = useDebouncedValue(search, 500);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFilterTags(dTags));
    dispatch(setFilterSearch(dSearch));
  }, [dTags, dSearch]);

  const loading = dTags !== tags || dSearch !== search;
  useEffect(() => {
    dispatch(setLoading(loading))
  }, [loading])

  const keyButtonDisplay = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Kbd>Ctrl</Kbd>
      <span style={{ margin: "0 5px" }}>+</span>
      <Kbd>/</Kbd>
    </div>
  );

  return (
    <MultiSelect
      placeholder="Search news"
      data={filterLabels}
      searchable
      clearButtonLabel="Clear filters"
      clearable
      maxDropdownHeight={260}
      sx={{ width: 400 }}
      transitionDuration={150}
      transition="pop-top-left"
      transitionTimingFunction="ease"
      icon={<IconSearch size={16} />}
      radius="md"
      size="md"
      shadow="lg"
      rightSection={keyButtonDisplay}
      rightSectionWidth={100}
      value={tags}
      onChange={(selectedTags) => setTags(selectedTags)}
      searchValue={search}
      onSearchChange={(newSearch) => setSearch(newSearch)}
    />
  );
};

export default SearchBar;
