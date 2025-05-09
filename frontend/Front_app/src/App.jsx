import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Register } from './page/register/register';
import { Add_property } from './page/hostone/host';
import { Login } from './page/login/login';
import { SearchResult } from './page/search_result/result';
import { Homepage } from './page/home/home';
import { Details } from './page/horel_details/details';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<Add_property />} />
        <Route path="*" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/details" element={<Details />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
