import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li><a href="/help-center">Help Center</a></li>
            <li><a href="/privacy-policy">Privacy policy</a></li>
            <li><a href="/faqs">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="/who-we-are">Who We Are</a></li>
            <li><a href="/career">Career</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>World Wide</h4>
          <ul>
            <li><a href="/countries">Countries</a></li>
          </ul>
        </div>
        <div className="footer-column rights">
          <p>All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;