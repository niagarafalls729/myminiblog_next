import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: '',
  weather: '',
  date: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action) => {
      console.log('setWeather::action:', action);
      state.city = action.payload.city;
      state.weather = action.payload.weather;
      state.date = action.payload.date;
    },
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
