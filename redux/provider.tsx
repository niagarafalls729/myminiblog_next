'use client';

import store from '@/redux/store';
import { Provider } from 'react-redux';
import * as React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { useAppSelector } from '@/redux/hooks';


export let persistor = persistStore(store);

export function ThemaMod({ children }: { children: React.ReactNode }) {
  const darkV = useAppSelector(state => state.darkAndLight.value);

  // 다크모드 상태를 body에 적용
  React.useEffect(() => {
    if (darkV) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }, [darkV]);

  return <>{children}</>;
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
