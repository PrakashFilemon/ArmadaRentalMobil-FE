import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentalDetails: [],
  rentalDetail: null,
  userRentals: [], // Tambahkan state untuk menyimpan rental milik user
};

//Define Slice
const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.rentalDetails = action.payload;
    },
    setDetail: (state, action) => {
      state.rentalDetail = action.payload;
    },
    // Tambahkan reducer untuk menyimpan rental milik user
    setUserRentals: (state, action) => {
      state.userRentals = action.payload;
    },
  },
});

export const { setDetail, setDetails, setUserRentals } = detailSlice.actions;

export default detailSlice.reducer;
