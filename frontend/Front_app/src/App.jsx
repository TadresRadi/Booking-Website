import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Register } from './page/register/register';
import { Add_property } from './page/hostone/host';
import { Login } from './page/login/login';
import { Homepage } from './page/home/home';

function App() {
  return (
    <Router>
      <Routes>

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
