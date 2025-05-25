












import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:8000";

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}/api/favorites/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust as needed
        'Content-Type': 'application/json',
      }
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  favoriteHotels: [],
  loading: false,
  error: null,
};

const favSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      if (!state.favoriteHotels.some(hotel => hotel.id === action.payload.id)) {
        state.favoriteHotels.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.favoriteHotels = state.favoriteHotels.filter(hotel => hotel.id !== action.payload.id);
    },
    setFavorites(state, action) {
      state.favoriteHotels = action.payload.map(fav => fav.hotel || fav);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteHotels = action.payload.map(fav => fav.hotel || fav);
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching favorites';
      });
  }
});

export const { addFavorite, removeFavorite, setFavorites } = favSlice.actions;
export default favSlice.reducer;
