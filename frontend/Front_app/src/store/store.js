import { configureStore } from '@reduxjs/toolkit';
import favReducer from './slice/fav'; 
import recentSearchReducer from './slice/recent_search';
import countereducer from './slice/counter'


const store = configureStore({
  reducer: {
    favorites: favReducer,        
    recentSearch: recentSearchReducer,
    counter:countereducer,
   

  },
});

export default store;
