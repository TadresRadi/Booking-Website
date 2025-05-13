import { configureStore } from "@reduxjs/toolkit";
import hotelreducer from "./slice/fav";
// import counter from "./slice/counter";
import recentSearchReducer from "./slice/recent_search"


const store = configureStore({
  reducer: {
 
    movies: hotelreducer,
    // counter: counter,
    recentSearch : recentSearchReducer
  },
});

export default store;