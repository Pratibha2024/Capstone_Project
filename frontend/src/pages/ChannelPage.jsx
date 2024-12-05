import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ChannelPage = ({ user }) => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`http://localhost:5000/api/channels/${id}/videos`, config);
        setVideos(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load videos.');
      }
    };
    fetchVideos();
  }, [id]);

  const handleDeleteVideo = async (videoId) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/channels/videos/${videoId}`, config);
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete video.');
    }
  };

  const handleEditVideo = (videoId) => {
    navigate(`/video/edit/${videoId}`);
  };

  return (
    <div className="channel-page">
      <h1>Your Channel</h1>
      {error && <p className="error">{error}</p>}
      {videos.length > 0 ? (
        <ul>
          {videos.map((video) => (
            <li key={video._id}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <button onClick={() => handleEditVideo(video._id)}>Edit</button>
              <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No videos yet.</p>
      )}
    </div>
  );
};

export default ChannelPage;
