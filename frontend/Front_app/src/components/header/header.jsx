import React from 'react';
import './Header.css';
import { useSelector } from 'react-redux';
import FavoritesPage from '../../page/fav/fav';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate()
   const counter =useSelector((state)=>state.counter.counter)
    function handelefav(){
      navigate('/fav')
      

    }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Logo</div>
        <nav className="nav-links">
   
     

        
        </nav>
        <div className="auth-buttons">
           <button  className="login-btn"onClick={handelefav}>fav </button>
          <button className="login-btn">Log in</button>
          <button className="create-account-btn">Create Account</button>
        </div>
      </div>
    </header>
  );
};

export default Header;