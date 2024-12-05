import Channel from '../models/Channel.js';
import Video from '../models/Video.js';

export const createChannel = async (req, res) => {
  const { name, description, channelBanner } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Channel name and description are required' });
  }

  try {
    const channel = await Channel.create({
      channelName: name,
      description,
      channelBanner: channelBanner || 'https://via.placeholder.com/728x90.png?text=Your+Channel+Banner',
      owner: req.user.id,
    });
    res.status(201).json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

// Get videos of a specific channel
export const getChannelVideos = async (req, res) => {
  try {
    const videos = await Video.find({ channel: req.params.channelId });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.videoId);
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a video
export const updateVideo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const video = await Video.findByIdAndUpdate(
      req.params.videoId,
      { title, description },
      { new: true }
    );
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
