import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const darkAndLight = createSlice({
  name: "darkAndLight",
  initialState,
  reducers: {
    resetMod: () => initialState,
    dark: (state) => {
      state.value = true;
    },
    light: (state) => {
      state.value = false;
    },
    toggleDarkAndLight: (state) => {
      state.value = !state.value;
    },
  },
});

export const { dark, light, resetMod, toggleDarkAndLight } =
  darkAndLight.actions;
export default darkAndLight.reducer;
