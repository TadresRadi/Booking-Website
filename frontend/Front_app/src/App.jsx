import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Register } from './page/register/register';
import { Add_property } from './page/hostone/host';
import { Login } from './page/login/login';
import { SearchResult } from './page/search_result/result';
import { Homepage } from './page/home/home';
import { Details } from './page/horel_details/details';
import AddPhotosPage from './page/Add_images/add_images.jsx';
import AddRoomForm from './page/Add_room/add_room.jsx';
import AddHotelForm from './page/Add_hotel/add_hotel.jsx';
import Setting from './page/setting/setting.jsx';
import { Provider } from 'react-redux';
import store from './store/store';
import SearchBar from './components/search_input/searchInput.jsx';
import Header from './components/header/header'; 
import Footer from './components/footer/footer';
import Fav from './page/fav/fav.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterSuccess from './page/register/RegisterSuccess.jsx';
import { UserProvider } from './context/UserContext.jsx';
import AdminDashboard from './page/Admin_Dashboard/admindashboard/dashboradoverview.jsx';
import Booking from './page/Admin_Dashboard/Booking/booking.jsx';
import Customer from './page/Admin_Dashboard/Customer/customer.jsx';
import Message from './page/Admin_Dashboard/message/message.jsx';
import UserManage from './page/Admin_Dashboard/User_managment/usermangment.jsx';
import { AdminProvider } from './context/AdminContext';

function App() {
  const location = useLocation();
  const showSearchBar = location.pathname === "/" || location.pathname === "/home" || location.pathname === "/search";
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register"|| location.pathname.startsWith("/admin");

  return (
    <Provider store={store}>
      <UserProvider>
        <div className="app-container">
          {!hideHeaderFooter && <Header />}
          {showSearchBar && <SearchBar />}
          
          <Routes>
            {/* المسارات العادية */}
            <Route path="/" element={<Homepage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={<Add_property />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/hotel/:id" element={<Details />} />
            <Route path="/fav" element={<Fav />} />
            <Route path="*" element={<Homepage />} />
            <Route path="add-hotel" element={<AddHotelForm />} />
            <Route path="add-room" element={<AddRoomForm />} />
            <Route path="add-images" element={<AddPhotosPage />} />
            <Route path="add-property" element={<Add_property />} />
            <Route path="/register-success" element={<RegisterSuccess />} />
            <Route path="/settings" element={<Setting />} />


            <Route 
              path="/admin" 
              element={
                <AdminProvider>
                  <AdminDashboard />
                </AdminProvider>
              } 
            />
            <Route 
              path="/admin/booking" 
              element={
                <AdminProvider>
                  <Booking />
                </AdminProvider>
              } 
            />
            <Route 
              path="/admin/customer" 
              element={
                <AdminProvider>
                  <Customer />
                </AdminProvider>
              } 
            />
            <Route 
              path="/admin/message" 
              element={
                <AdminProvider>
                  <Message />
                </AdminProvider>
              } 
            />
            <Route 
              path="/admin/user-manage" 
              element={
                <AdminProvider>
                  <UserManage />
                </AdminProvider>
              } 
            />
          </Routes>

          {!hideHeaderFooter && <Footer />}
        </div>
      </UserProvider>
    </Provider>
  );
}

export default App;