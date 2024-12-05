import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFire, FaUsers, FaHistory, FaBars } from 'react-icons/fa';
import '../App.css';

const Sidebar = ({ isOpen }) => {
  return (
    <div id="sidebar" className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/">
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/trending">
            <FaFire className="icon" /> Trending
          </Link>
        </li>
        <li>
          <Link to="/subscriptions">
            <FaUsers className="icon" /> Subscriptions
          </Link>
        </li>
        <hr />
        <li>
          <Link to="/library">
            <FaBars className="icon" /> Library
          </Link>
        </li>
        <li>
          <Link to="/history">
            <FaHistory className="icon" /> History
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
