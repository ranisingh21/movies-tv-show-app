import React from 'react';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footerRow">
          <div className="footer-column">
            <h5 className="footer-heading">ABOUT</h5>
            <ul className="footer-list">
              <li>Contact us</li>
              <li>About us</li>
              <li>Careers</li>
              <li>Ecommerce Stories</li>
              <li>Press</li>
              <li>Ecommerce Wholesale</li>
              <li>Corporate Information</li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-heading">HELP</h5>
            <ul className="footer-list">
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
              <li>Report Infringement</li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-heading">CONSUMER POLICY</h5>
            <ul className="footer-list">
              <li>Cancellation & Returns</li>
              <li>Terms of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
              <li>Grievance Redressal</li>
              <li>EPR compliance</li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-heading">SOCIAL</h5>
            <ul className="footer-list">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>YouTube</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 City Guide App - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;