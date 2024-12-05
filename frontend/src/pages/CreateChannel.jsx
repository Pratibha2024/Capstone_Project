import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CreateChannel = ({ user }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [channelBanner, setChannelBanner] = useState('');
  const [channelDetails, setChannelDetails] = useState(null); // To display channel details after creation
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateChannel = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please sign in to create a channel.');
      return;
    }

    if (!name.trim() || !description.trim()) {
      setError('Channel name and description are required.');
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      if (!token) {
        setError('Authentication failed. Please log in again.');
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(
        'http://localhost:5000/api/channels',
        { name, description, channelBanner },
        config
      );

      setChannelDetails(data); // Store the created channel details
      setError(''); // Clear errors
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  if (channelDetails) {
    return (
      <div className="channel-created">
        <h1>Channel Created Successfully!</h1>
        <div className="channel-banner">
          <img src={channelDetails.channelBanner} alt={channelDetails.channelName} />
        </div>
        <h2>{channelDetails.channelName}</h2>
        <p>{channelDetails.description}</p>
        <button onClick={() => navigate(`/channel/${channelDetails._id}`)} className="go-to-channel">
          Go to Channel
        </button>
      </div>
    );
  }

  return (
    <div className="create-channel-page">
      <h1>Create Your Channel</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleCreateChannel}>
        <input
          type="text"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Channel Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Channel Banner URL (optional)"
          value={channelBanner}
          onChange={(e) => setChannelBanner(e.target.value)}
        />
        <button type="submit" className="create-channel-button">Create Channel</button>
      </form>
    </div>
  );
};

export default CreateChannel;
