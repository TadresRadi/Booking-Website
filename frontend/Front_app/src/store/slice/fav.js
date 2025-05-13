import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritehotel: [],
};

const favSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
   
      if (!state.favoritehotel.some((hotel) => hotel.id === action.payload.id)) {
        state.favoritehotel.push(action.payload);
      }
    },
    // removeFavorite: (state, action) => {

    //   // state.favoritehotel = state.favoritehotel.filter((hotel) => movie.id !== action.payload.id);
    // },
  },
});

export const { addFavorite, removeFavorite } = favSlice.actions;
export default favSlice.reducer;
