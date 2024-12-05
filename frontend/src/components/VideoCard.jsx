import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <Link to={`/video/${video._id}`} className="video-thumbnail-link">
        <img src={video.thumbnailUrl} alt={video.title} className="video-thumbnail" />
      </Link>
      <div className="video-infor">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.uploader || 'Unknown'}</p>
        <p className="video-views">{video.views.toLocaleString()} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
