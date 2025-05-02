
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Add_property from './pages/host/hostone';
import Register from './pages/register/register';



function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/booking" element={<Add_property/>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;