import { configureStore } from "@reduxjs/toolkit";
import hotelreducer from "./slice/fav";
import counter from "./slice/counter";


const store = configureStore({
  reducer: {
 
    movies: hotelreducer,
    counter: counter,
  },
});

export default store;