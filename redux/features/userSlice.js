import { createSlice } from '@reduxjs/toolkit';

// localStorage에서 사용자 정보를 가져오거나 기본값 사용
const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
  }
  return {
    id: '',
    status: false,
    email: '',
  };
};

const initialState = getInitialState();
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('setUser::action:;', action);
      console.log('setUser::action:;', action.payload.id);
      state.status = true;
      state.email = action.payload.email;
      state.id = action.payload.id;

      // localStorage에 사용자 정보 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: action.payload.id,
            status: true,
            email: action.payload.email,
          })
        );
      }
    },
    logout: state => {
      // localStorage에서 사용자 정보 제거
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      return initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

// export const selectId = (state) => state.user.id;
// export const selectEmail = (state) => state.user.email;
// export const selectUsername = (state) => state.user.username;

export default userSlice.reducer;
