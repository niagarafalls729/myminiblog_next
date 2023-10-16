import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  status: '',
  userName: '',
  phone_number: '01012341234',
  birth_day: '19920729',
  email: 'jisu.kim@mdstech.co.kr'
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("setUser::action:;", action)
      state.status = action.payload.data;
      state.userName = action.payload.username;
      state.id = action.payload.id;
      state.phone_number = action.payload.phone_number;
      state.birth_day = action.payload.birth_day;
      state.email = action.payload.email;
    },
    logout: (state) => initialState

  },
});

export const { setUser, logout } = userSlice.actions;

// export const selectId = (state) => state.user.id;
// export const selectEmail = (state) => state.user.email;
// export const selectUsername = (state) => state.user.username;

export default userSlice.reducer;