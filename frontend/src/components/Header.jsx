import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaYoutube } from 'react-icons/fa';
import '../App.css';

const Header = ({ user, setUser, toggleSidebar }) => {
  const [search, setSearch] = useState(''); // Search query
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state for user profile
  const navigate = useNavigate();

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${search.trim()}`); // Navigate with trimmed search query
    } else {
      navigate(`/`); // Navigate to home if search is empty
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user from localStorage
    setUser(null);
    navigate('/'); // Redirect to home
  };

  // Get initials for the user
  const getUserInitials = (name) => {
    if (!name) return '';
    const initials = name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    return initials.slice(0, 2); // Limit to 2 initials
  };

  return (
    <header className="header">
      {/* Left Section: Logo and Sidebar Toggle */}
      <div className="header-left">
        {toggleSidebar && (
          <button onClick={toggleSidebar} className="hamburger-btn">
            &#9776;
          </button>
        )}
        <Link to="/" className="header-logo">
          <FaYoutube className="header-logo-icon" />
          <span className="header-logo-text">YouTube</span>
        </Link>
      </div>

      {/* Middle Section: Search Bar */}
      <form onSubmit={handleSearch} className="header-search">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="header-search-input"
        />
        <button type="submit" className="header-search-button">🔍</button>
      </form>

      {/* Right Section: Authentication */}
      <div className="auth-section">
        {user ? (
          <div
            className="user-profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {/* Display User Initials */}
            <div className="user-initials">{getUserInitials(user.username || user.name)}</div>
            {dropdownOpen && (
              <div className="dropdown">
                <p>{user.username || user.name}</p>
                <Link to="/create-channel">Create Channel</Link>
                <p>Switch Account</p>
                <p>Google Account</p>
                <p onClick={handleLogout}>Sign Out</p>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="signin-btn">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
