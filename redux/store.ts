import { configureStore } from '@reduxjs/toolkit';
import darkSlice from './features/darkSlice';
import counterReducerJS from './features/counterSliceJS';
import userSlice from './features/userSlice';
import weatherSlice from './features/weatherSlice';
import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import storage from './storage';

const reducers = combineReducers({
  counter: counterReducerJS,
  user: userSlice,
  darkAndLight: darkSlice,
  weather: weatherSlice,
});

const persistConfig = {
  key: 'root',
  //로컬스토리지를 사용할 것이기때문에 storage를 적어주었다
  storage,
  whitelist: ['user', 'counter', 'darkAndLight', 'weather'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // 다음이 middleware 추가 코드이다.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
