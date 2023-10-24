import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  status: false,
  email: '',
};
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
    },
    logout: state => initialState,
  },
});

export const { setUser, logout } = userSlice.actions;

// export const selectId = (state) => state.user.id;
// export const selectEmail = (state) => state.user.email;
// export const selectUsername = (state) => state.user.username;

export default userSlice.reducer;
