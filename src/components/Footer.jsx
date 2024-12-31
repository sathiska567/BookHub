import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import './component.css';

const Footer = () => {
  return (
    <footer className="custom-footer py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Company Name</h5>
            <p className="footer-text">Creating innovative solutions for a better tomorrow.</p>
            <div className="social-icons">
              <Facebook className="social-icon" size={24} />
              <Twitter className="social-icon" size={24} />
              <Instagram className="social-icon" size={24} />
              <Linkedin className="social-icon" size={24} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Contact Us</h5>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={20} />
                <span>+94 717981980</span>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <span>sasindusathiska@gmail.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>259/1A Meegoda North , Meegoda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="row">
            <div className="col-md-6">
              <p className="copyright">© 2025 Company Name. All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;