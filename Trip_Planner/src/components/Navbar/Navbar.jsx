import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  LogOut,
  Settings,
  Plane,
  MapPin,
  ChevronDown,
  Bell,
  Train, // Added Train Icon
} from "lucide-react";
import "./Navbar.css";

// Simple 3D interactive popup component
const AccessPopup = ({ message, onClose }) => (
  <div className="popup-overlay" onClick={onClose}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <div className="popup-header">
        <div className="popup-icon">✈️</div>
        <h3>Journey Access Required</h3>
      </div>
      <p>{message}</p>
      <button onClick={onClose} className="popup-button">
        Continue Exploring
      </button>
    </div>
  </div>
);

// User Dropdown Component
const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <User size={16} />,
      label: "My Profile",
      action: () => navigate("/profile"),
    },
    {
      icon: <MapPin size={16} />,
      label: "My Trips",
      action: () => navigate("/mytrips"),
    },
    {
      icon: <Settings size={16} />,
      label: "Settings",
      action: () => navigate("/settings"),
    },
    {
      icon: <Bell size={16} />,
      label: "Notifications",
      action: () => navigate("/notifications"),
    },
    { icon: <LogOut size={16} />, label: "Logout", action: onLogout },
  ];

  return (
    <div className="user-dropdown-container">
      <button
        className="user-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="user-avatar">
          <div className="avatar-initials">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="avatar-status"></div>
        </div>
        <span className="username-text">{user.username}</span>
        <ChevronDown
          className={`dropdown-chevron ${isOpen ? "open" : ""}`}
          size={16}
        />
      </button>

      {isOpen && (
        <>
          <div className="dropdown-backdrop" onClick={() => setIsOpen(false)} />
          <div className="user-dropdown-menu">
            <div className="dropdown-header">
              <div className="dropdown-avatar">
                <div className="avatar-initials-large">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="dropdown-user-info">
                <h4>{user.username}</h4>
                <span className="user-email">{user.email}</span>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-items">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                >
                  <span className="dropdown-item-icon">{item.icon}</span>
                  <span className="dropdown-item-label">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [popupMessage, setPopupMessage] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActiveLink = (path) => location.pathname === path;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/");
  };

  const handleProtectedClick = (e, pageName) => {
    if (!user) {
      e.preventDefault();
      setPopupMessage(
        `Start your journey by signing in to access the ${pageName} page! ✈️`
      );
    } else {
      closeMobileMenu();
    }
  };

  return (
    <>
      <nav
        className={`nav ${isVisible ? "nav-visible" : "nav-hidden"} ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="nav-container">
          {/* Logo with animation */}
          <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
            <div className="logo-icon-animated">
              <Plane className="logo-plane" size={24} />
              <div className="logo-trail"></div>
            </div>
            <span className="logo-text">TRAVELO</span>
          </Link>

          {/* Menu */}
          <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
            <li>
              <Link
                to="/"
                className={`nav-link ${isActiveLink("/") ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                <span className="link-text">Home</span>
                <div className="link-underline"></div>
              </Link>
            </li>

            <li>
              <Link
                to="/explore"
                className={`nav-link ${
                  isActiveLink("/explore") ? "active" : ""
                }`}
                onClick={(e) => handleProtectedClick(e, "Packages")}
              >
                <span className="link-text">Packages</span>
                <div className="link-underline"></div>
              </Link>
            </li>

            {/* NEW TRANSPORT SECTION */}
            <li>
              <Link
                to="/transports"
                className={`nav-link ${
                  isActiveLink("/transports") ? "active" : ""
                }`}
                onClick={(e) => handleProtectedClick(e, "Transports")}
              >
                <span className="link-text">Transports</span>
                <div className="link-underline"></div>
              </Link>
            </li>

            {/* AUTH SECTION */}
            {!user ? (
              <li>
                <Link
                  to="/register"
                  className={`nav-link ${
                    isActiveLink("/register") ? "active" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  <span className="link-text">Register</span>
                  <div className="link-underline"></div>
                </Link>
              </li>
            ) : (
              <li className="user-section">
                <UserDropdown user={user} onLogout={handleLogout} />
              </li>
            )}

            <li className="nav-cta">
              <Link
                to={user ? "/create-trip" : "/login"}
                className="nav-contact"
                onClick={(e) =>
                  !user && handleProtectedClick(e, "Plan Journey")
                }
              >
                <span className="cta-icon">✨</span>
                <span className="cta-text">Plan Journey</span>
                <div className="cta-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="cta-sparkle"></div>
              </Link>
            </li>
          </ul>

          {/* Mobile Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Popup */}
      {popupMessage && (
        <AccessPopup
          message={popupMessage}
          onClose={() => setPopupMessage("")}
        />
      )}
    </>
  );
};

export default Navbar;
