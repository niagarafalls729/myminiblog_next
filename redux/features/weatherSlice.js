import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: '',
  weather: '',
};
const weahterSlice = createSlice({
  name: 'weahter',
  initialState,
  reducers: {
    setWeather: (state, action) => {
      console.log('setUser::action:;', action);
      console.log('setUser::action:;', action.payload.id);
      state.city = action.payload.city;
      state.weather = action.payload.weather;
      state.date = action.payload.date;
    },
  },
});

export const { setWeather } = weahterSlice.actions;

// export const selectId = (state) => state.user.id;
// export const selectEmail = (state) => state.user.email;
// export const selectUsername = (state) => state.user.username;

export default weahterSlice.reducer;
