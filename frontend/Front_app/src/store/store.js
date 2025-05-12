import { configureStore } from "@reduxjs/toolkit";
import hotelreducer from "./slice/fav";


const store = configureStore({
  reducer: {
 
    movies: hotelreducer,
  },
});

export default store;