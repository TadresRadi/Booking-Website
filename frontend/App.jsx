import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import  AddHotelForm  from './components/Add_hotel/add_hotel.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddRoomForm from './components/Add_room/add_room.jsx';
import FinalStepForm from './components/Add_details/add_details.jsx';



function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='Add-Hotel' element={<AddHotelForm/>}/>
      <Route path='Add-Room' element={<AddRoomForm/>}/>
      <Route path='Add-Details' element={<FinalStepForm/>}/>
    </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
