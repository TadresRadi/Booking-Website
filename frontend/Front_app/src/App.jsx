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
import { Booking } from './page/booking/booking.jsx';
import RegisterSuccess from './page/register/RegisterSuccess.jsx';
import { UserProvider } from './context/UserContext.jsx';
import PaymentForm from './page/payment/PaymentForm.jsx';
import AfterReservation from './page/AfterReservation/AfterReservation.jsx';
import FloatingChatButton from './components/Floating_Chat_Button/FloatingChatButton.jsx';
import { ChatProvider } from './context/ChatContext.jsx';

// Admin Dashboard Imports
import AdminSidebar from "./page/Admin_Dashboard/components/Sidebar.jsx";
import AdminTopbar from "./page/Admin_Dashboard/components/Topbar.jsx";
import A_Dashboard from "./page/Admin_Dashboard/pages/A_Dashboard.jsx";
import UserProfile from "./page/Admin_Dashboard/pages/UserProfile.jsx";
import UsersList from "./page/Admin_Dashboard/pages/UsersList.jsx";
import TransactionsList from "./page/Admin_Dashboard/pages/TransactionsList.jsx";
import ChatRoom from "./page/Admin_Dashboard/pages/ChatRoom.jsx";
import ManagerList from "./page/Admin_Dashboard/pages/ManagerList.jsx"; 
import AdminLogin from "./page/Admin_Dashboard/pages/AdminLogin.jsx";
import { AdminProvider } from './page/Admin_Dashboard/components/admincontext.jsx';
import EditCombinedStepper from './page/EditHotelStepper/edithotelstepper.jsx';
import HostDashboard from './page/HostDashboard/HostHome/hostdashboard.jsx';
import HostBookings from './page/HostDashboard/HostBooking/hostbooking.jsx';
import Properties from './page/HostDashboard/Properties/properties.jsx';






function App() {
  const location = useLocation();
  const showSearchBar = location.pathname === "/" || location.pathname === "/home" || location.pathname === "/search";
  const hideHeaderFooter = location.pathname.startsWith("/admin");
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminLogin = location.pathname === "/admin/login";

  return (
    <ChatProvider>
    <Provider store={store}>
      <UserProvider>
        <div className="app-container">
          {isAdminRoute ? (
            isAdminLogin ? (
              
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
              </Routes>
            ) : (
              <AdminProvider>
                <AdminSidebar />
                <AdminTopbar userName="TadresRadi" />
                <div style={{ marginLeft: 260, marginTop: 60, padding: 24 }}>
                  <Routes>
                    <Route path="/admin/dashboard" element={<A_Dashboard />} />
                    <Route path="/admin/user-profile" element={<UserProfile />} />
                    <Route path="/admin/users-list" element={<UsersList />} />
                    <Route path="/admin/transactions-list" element={<TransactionsList />} />
                    <Route path="/admin/chat-room" element={<ChatRoom />} />
                    <Route path="/admin/manager-list" element={<ManagerList />} />
                  </Routes>
                </div>
              </AdminProvider>
            )
          ) : (
            // Normal User Layout
            <>
              {!hideHeaderFooter && <Header />}
              {showSearchBar && <SearchBar />}
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Add_property" element={<Add_property />} />
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
                <Route path="/booking" element={<Booking />} />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/after-reservation" element={<AfterReservation />} />
                <Route path='edit-property' element={<EditCombinedStepper />} />
                <Route path='host-dashboard' element={<HostDashboard/>} />
                <Route path="host-properties" element={<Properties />} />
                <Route path="/edit-hotel/:hotelId" element={<AddHotelForm />} />
                <Route path="host-booking" element={<HostBookings />} />
              </Routes>
                <FloatingChatButton />
              {!hideHeaderFooter && <Footer />}
            </>
          )}
        </div>
      </UserProvider>
    </Provider>
    </ChatProvider>
  );
}

export default App;