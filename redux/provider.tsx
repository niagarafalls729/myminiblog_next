'use client';

import store from '@/redux/store';
import { Provider } from 'react-redux';
import * as React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { useAppSelector } from '@/redux/hooks';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export let persistor = persistStore(store);

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function ThemaMod({ children }: { children: React.ReactNode }) {
  const darkV = useAppSelector(state => state.darkAndLight.value);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {},
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkV ? 'dark' : 'light',
        },
      }),
    [darkV]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemaMod>{children}</ThemaMod>
      </PersistGate>
    </Provider>
  );
}
