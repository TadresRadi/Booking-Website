import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Register } from './page/register/register';
import { Add_property } from './page/hostone/host';
import { Login } from './page/login/login';
import { SearchResult } from './page/search_result/result';
import { Homepage } from './page/home/home';
import { Details } from './page/horel_details/details';
import { Fav } from './page/fav/fav';
import { Provider } from 'react-redux';
import store from './store/store';

import SearchBar from './components/search_input/searchInput.jsx';
import { Homepage } from './page/home/home';

function App() {
  const location = useLocation();

  const showSearchBar = location.pathname === "/home" || location.pathname === "/search";

  return (
    <Provider store={store}>
     
        {showSearchBar && <SearchBar />}

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Add_property />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/details/:id" element={<Details />} />
                <Route path="fav" element={<Fav />} />
          <Route path="*" element={<Register />} />
        </Routes>
     
    </Provider>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<Add_property />} />
        <Route path="*" element={<Register />} />
        <Route path="home" element={<Homepage />} />

      </Routes>
    </Router>
  );
}

export default App;
