import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Register } from './page/register/register';
import { Add_property } from './page/hostone/host';
import { Login } from './page/login/login';
import { SearchResult } from './page/search_result/result';
import { Homepage } from './page/home/home';
import { Details } from './page/horel_details/details';
import SearchBar from './components/search_input/searchInput.jsx'
function App() {
  const location = useLocation();

  const showSearchBar = location.pathname === "/home" || location.pathname === "/search";

  return (
    <>
      {showSearchBar && <SearchBar />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<Add_property />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;