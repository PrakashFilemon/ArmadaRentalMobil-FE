import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
  carInfo: null,
};

//Define Slice
const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setCar: (state, action) => {
      state.carInfo = action.payload;
    },
  },
});

export const { setCar, setCars } = carSlice.actions;

export default carSlice.reducer;
