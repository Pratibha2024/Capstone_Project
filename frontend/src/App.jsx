import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import VideoPage from './pages/VideoPage';
import ChannelPage from './pages/ChannelPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CreateChannel from './pages/CreateChannel';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <Router>
      <div className="app-container">
        <Header user={user} setUser={setUser} toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`app-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage user={user}/>}/>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/channel/:id" element={<ChannelPage user={user} />} />
            <Route path="/create-channel" element={<CreateChannel user={user} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
