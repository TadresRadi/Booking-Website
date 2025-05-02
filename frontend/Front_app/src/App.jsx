import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Register } from './page/register/register';
import { Add_property } from './page/hostone/host';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Add_property />} />
        <Route path="*" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
