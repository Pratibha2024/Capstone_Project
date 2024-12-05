import React, { useState, useEffect } from 'react';
import VideoGrid from '../components/VideoGrid';
import FilterButtons from '../components/FilterButtons';
import { fetchVideos } from '../services/api';
import '../App.css';

const HomePage = ({ videos: propVideos = [] }) => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      if (propVideos.length > 0) {
        setVideos(propVideos);
        setFilteredVideos(propVideos);
      } else {
        const response = await fetchVideos();
        setVideos(response.data);
        setFilteredVideos(response.data);
      }
    };
    getVideos();
  }, [propVideos]);

  const handleCategorySelect = (category) => {
    setFilteredVideos(
      category === 'All'
        ? videos
        : videos.filter((video) =>
            video.category?.toLowerCase().includes(category.toLowerCase())
          )
    );
  };

  return (
    <div>
      <FilterButtons onCategorySelect={handleCategorySelect} />
      <div style={{ marginTop: '100px' }}>
        <VideoGrid videos={filteredVideos} />
      </div>
    </div>
  );
};

export default HomePage;
