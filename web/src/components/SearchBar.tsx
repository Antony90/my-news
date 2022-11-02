import { Kbd, TextInput } from '@mantine/core';
import { useFocusTrap, useHotkeys } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons'
import React, { useRef } from 'react'

const SearchBar = () => {
  const focusTrapRef = useFocusTrap(false);
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
    <TextInput
      ref={focusTrapRef}
      icon={<IconSearch size={16} />}
      rightSectionWidth={90}
      rightSection={keyButtonDisplay}
      placeholder="Search news"
      radius="md"
      size="md"
    />  
  )
}

export default SearchBar