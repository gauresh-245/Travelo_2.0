import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com', color: '#1877F2' },
    { icon: <FaTwitter />, url: 'https://twitter.com', color: '#1DA1F2' },
    { icon: <FaInstagram />, url: 'https://instagram.com', color: '#E4405F' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', color: '#0A66C2' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/explore' },
    { name: 'Create Trip', path: '/create-trip' },
    { name: 'Hotels', path: '/hotel-search' },
    { name: 'Transports', path: '/transports' },
    { name: 'My Trips', path: '/mytrips' }
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, text: 'support@travelo.com' },
    { icon: <FaPhone />, text: '+1 (555) 123-4567' },
    { icon: <FaMapMarkerAlt />, text: '123 Travel Street, Adventure City' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Top */}
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="brand-name">TRAVELO</h2>
            <p className="brand-tagline">Your Journey, Our Passion</p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--icon-color': social.color }}
                >
                  <div className="icon-wrapper">
                    {social.icon}
                  </div>
                  <div className="icon-halo"></div>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <h3 className="links-title">Quick Links</h3>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <li key={index} className="links-item">
                  <Link to={link.path} className="link">
                    <span className="link-text">{link.name}</span>
                    <span className="link-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="contact-title">Contact Us</h3>
            <div className="contact-info">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{info.icon}</div>
                  <span className="contact-text">{info.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-newsletter">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-text">Subscribe for travel deals & tips</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
              />
              <button className="newsletter-button">
                <span className="button-text">Subscribe</span>
                <div className="button-spark"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-divider">
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
          
          <div className="footer-info">
            <p className="copyright">
              © {currentYear} Travelo Management System. All rights reserved.
            </p>
            <div className="legal-links">
              <a href="/privacy" className="legal-link">Privacy Policy</a>
              <a href="/terms" className="legal-link">Terms of Service</a>
              <a href="/cookies" className="legal-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;