import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HotelProvider } from './context/HotelContext.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BookingProvider } from './context/BookingContext.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>
   
    <BrowserRouter >
         <BookingProvider>
          <UserProvider>
        
      <HotelProvider>
        <App />
      </HotelProvider>
        
            </UserProvider>
            </BookingProvider>
    </BrowserRouter>

  </StrictMode>


)
