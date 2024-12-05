import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import FilterButtons from '../components/FilterButtons';
import { fetchVideos } from '../services/api';
import '../App.css';

const HomePage = ({ isSidebarOpen }) => {
  const [videos, setVideos] = useState([]); // All videos
  const [filteredVideos, setFilteredVideos] = useState([]); // Filtered videos
  const [activeCategory, setActiveCategory] = useState('All'); // Active category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
        setFilteredVideos(data); // Initialize with all videos
      } catch (err) {
        setError('Error fetching videos');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search')?.toLowerCase() || '';

    // Filter videos based on search query and active category
    let filtered = videos;

    if (searchQuery) {
      filtered = filtered.filter((video) =>
        video.title.toLowerCase().includes(searchQuery)
      );
    }

    if (activeCategory !== 'All') {
      filtered = filtered.filter((video) =>
        video.category?.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    setFilteredVideos(filtered);
  }, [location.search, videos, activeCategory]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-page">
      {/* Filter Buttons */}
      <div className={`filter-buttons ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <FilterButtons activeCategory={activeCategory} onCategorySelect={handleCategorySelect} />
      </div>

      {/* Video Grid */}
      <div style={{ marginTop: '100px' }}>
        <VideoGrid videos={filteredVideos} />
      </div>
    </div>
  );
};

export default HomePage;
