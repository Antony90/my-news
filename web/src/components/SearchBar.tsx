import { Kbd, MultiSelect } from '@mantine/core';
import { IconCross, IconSearch } from '@tabler/icons'
import { useState } from 'react';

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
]


const SearchBar = () => {
  // const focusTrapRef = useFocusTrap(false);
  // useHotkeys([
  //   ['ctrl+/', () => searchBoxRef.current ]);

  const keyButtonDisplay = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Kbd>Ctrl</Kbd>
      <span style={{ margin: '0 5px' }}>+</span>
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
      transition="slide-down"
      transitionTimingFunction="ease"
      icon={<IconSearch size={16} />}
      radius="md"
      size="md"
      rightSection={keyButtonDisplay}
      rightSectionWidth={100}

    />
  )
}

export default SearchBar