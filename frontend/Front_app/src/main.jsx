import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HotelProvider } from './context/HotelContext.jsx'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter >
      <HotelProvider>
        <App />
      </HotelProvider>
    </BrowserRouter>

  </StrictMode>


)
