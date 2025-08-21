import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentals: [],
  rentalInfo: null,
  unavailableDates: [],
  loadingDates: false,
  dateError: null,
};

// Define Slice
const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    setRentals: (state, action) => {
      state.rentals = action.payload;
    },
    setRental: (state, action) => {
      state.rentalInfo = action.payload;
    },
    setUnavailableDatesLoading: (state) => {
      state.loadingDates = true;
      state.dateError = null;
    },
    setUnavailableDates: (state, action) => {
      state.unavailableDates = action.payload;
      state.loadingDates = false;
    },
    setUnavailableDatesError: (state, action) => {
      state.dateError = action.payload;
      state.loadingDates = false;
    },
  },
});

export const {
  setRental,
  setRentals,
  setUnavailableDates,
  setUnavailableDatesLoading,
  setUnavailableDatesError,
} = rentalSlice.actions;

export default rentalSlice.reducer;
