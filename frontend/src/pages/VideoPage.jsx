import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);

  const dummyVideos = [
    {
      _id: '1',
      title: 'Learn JavaScript in 1 Hour',
      thumbnailUrl: 'https://www.shutterstock.com/image-photo/elearning-education-concept-learning-online-260nw-1865958031.jpg',
      uploader: 'JaneDoe',
      views: 12000,
    },
    {
      _id: '2',
      title: 'HTML Crash Course',
      thumbnailUrl: 'https://www.shutterstock.com/image-photo/elearning-education-concept-learning-online-260nw-1865958031.jpg',
      uploader: 'CodeAcademy',
      views: 18000,
    },
    {
      _id: '3',
      title: 'CSS for Beginners',
      thumbnailUrl: 'https://www.shutterstock.com/image-photo/elearning-education-concept-learning-online-260nw-1865958031.jpg',
      uploader: 'WebSchool',
      views: 9000,
    },
  ];

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Error loading video. Please try again later.');
      }
    };

    fetchVideo();
  }, [id]);

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(`http://localhost:5000/api/videos/${id}/comments`, {
        text: newComment,
      });
      setComments((prev) => [...prev, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}/comments/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  if (error) return <div>{error}</div>;
  if (!video) return <div>Loading...</div>;

  return (
    <div className="video-page-container">
      {/* Main Content */}
      <div className="video-page">
        {/* Video Player Section */}
        <div className="video-player-container">
          <iframe
            src={video.videoUrl}
            title={video.title}
            className="video-iframe"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Details Section */}
        <div className="video-details">
          <h1 className="video-title">{video.title}</h1>
          <p className="video-description">{video.description}</p>
          <div className="video-info">
            <span className="channel-name">{video.uploader || 'Unknown Channel'}</span>
            <div className="like-dislike-buttons">
              <button className="like-button">👍 {video.likes || 0}</button>
              <button className="dislike-button">👎 {video.dislikes || 0}</button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h2>Comments</h2>
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={addComment}>Comment</button>
          </div>
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment._id} className="comment-item">
                <div>
                  <span>{comment.userId || 'Anonymous'}</span>
                  <p>{comment.text}</p>
                </div>
                <button onClick={() => deleteComment(comment._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar with Recommended Videos */}
      <div className="video-sidebar">
        <h3>Up Next</h3>
        {dummyVideos.map((video) => (
          <div key={video._id} className="sidebar-video-card">
            <Link to={`/video/${video._id}`}>
              <img src={video.thumbnailUrl} alt={video.title} className="sidebar-thumbnail" />
            </Link>
            <div className="sidebar-video-info">
              <h4 className="sidebar-video-title">{video.title}</h4>
              <p className="sidebar-uploader">{video.uploader}</p>
              <p className="sidebar-views">{video.views.toLocaleString()} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
