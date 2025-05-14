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
import Header from './components/header/header'; 
import Footer from './components/footer/footer';

function App() {
  const location = useLocation();

  const showSearchBar = location.pathname === "/home" || location.pathname === "/search";
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <Provider store={store}>
      <div className="app-container">
        {!hideHeaderFooter && <Header />}
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
        
        {!hideHeaderFooter && <Footer />}
      </div>
    </Provider>
  );
}

export default App;