import { createSlice } from "@reduxjs/toolkit";

const recentSearchSlice = createSlice({
  name: "recentSearch",
  initialState: [],
  reducers: {
    addSearch: (state, action) => {
  const { id } = action.payload; // Assuming 'id' is the unique identifier for each hotel
  
  // Check if the hotel already exists in the state based on 'id'
  const existingHotel = state.find((hotel) => hotel.id === id);
  
  // If it doesn't exist, add it to the state
  if (!existingHotel) {
    state.push(action.payload);
  }
}
  }
});

export const { addSearch } = recentSearchSlice.actions;
export default recentSearchSlice.reducer;
