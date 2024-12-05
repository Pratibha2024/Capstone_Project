import Video from '../models/Video.js';

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos' });
  }
};

export const getVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id)
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching video' });
  }
};

export const createVideo = async (req, res) => {
  const { title, thumbnailUrl, description, channelId } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      thumbnailUrl,
      description,
      channelId,
      uploader: req.user._id,
    });
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: 'Error creating video' });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.uploader.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' });

    await video.remove();
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting video' });
  }
};
