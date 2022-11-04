import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useState } from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';

const AppWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  let savedColorScheme: ColorScheme;
  const themeStr = localStorage.getItem("dark_mode") || 'dark';

  if (themeStr === 'light' || themeStr === 'dark') {
    savedColorScheme = themeStr;
  } else {
    savedColorScheme = 'dark';
  }

  const [colorScheme, setColorScheme] = useState<ColorScheme>(savedColorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const newColor = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(newColor);
    localStorage.setItem("dark_mode", newColor);

  }
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