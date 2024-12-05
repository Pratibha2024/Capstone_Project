import React from 'react';
import '../App.css';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return <div>No videos available</div>;
  }
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id || video.videoId} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
