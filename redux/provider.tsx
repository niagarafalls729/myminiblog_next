"use client";

import store  from "@/redux/store";
import { Provider } from "react-redux";
import * as React from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
export let persistor = persistStore(store);

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function Test({ children }: { children: React.ReactNode }) {
    const darkV = useAppSelector((state) => state.darkAndLight.value);
    console.log("d,",darkV)
    
  const [mode, setMode] = React.useState("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [darkV]
  );
  const darkTheme = createTheme({
    palette: {
      mode: darkV?'dark':'light',
    },
  });
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode : darkV?'dark':'light',
        },
      }),
    [darkV]
  );
  React.useEffect(() => {
    // Call toggleColorMode from colorMode
    colorMode.toggleColorMode();
  }, [darkV]);
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </ColorModeContext.Provider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Test>{children}</Test>
        </PersistGate>
      </Provider>
    );
  }