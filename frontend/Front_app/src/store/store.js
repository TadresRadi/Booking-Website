import { configureStore } from '@reduxjs/toolkit';
import favReducer from './slice/fav'; // ✅ import the favorites slice
import recentSearchReducer from './slice/recent_search'; // your other slice(s)

const store = configureStore({
  reducer: {
    favorites: favReducer,          // ✅ must match the key you use in useSelector
    recentSearch: recentSearchReducer,
    
    // other reducers if any
  },
});

export default store;
