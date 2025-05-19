import { configureStore } from '@reduxjs/toolkit';
import favReducer from './slice/fav'; 
import recentSearchReducer from './slice/recent_search';
import countereducer from './slice/counter'
import loaderreducer from'./slice/loadder'

const store = configureStore({
  reducer: {
    favorites: favReducer,        
    recentSearch: recentSearchReducer,
    counter:countereducer,
    loader:loaderreducer

  },
});

export default store;
