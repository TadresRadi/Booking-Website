

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteHotels: [],
};

const favSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      
        if (!state.favoriteHotels.some((hotel) => hotel.id === action.payload.id)) {
        state.favoriteHotels.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {

state.favoriteHotels = state.favoriteHotels.filter((hotel) => hotel.id !== action.payload.id);
    },
  },
});

export const { addFavorite, removeFavorite } = favSlice.actions;
export default favSlice.reducer;
