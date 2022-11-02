import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useState } from 'react'
import { Provider } from 'react-redux';
import store from './store';

const AppWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Provider store={store}>
          {children}
        </Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default AppWrapper