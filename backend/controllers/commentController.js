import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

// Add a comment to a video
export const addComment = async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const newComment = {
      _id: new mongoose.Types.ObjectId(),
      text,
      userId: req.user._id,
      timestamp: new Date(),
    };

    video.comments.push(newComment);
    await video.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
};

// Get all comments for a video
export const getComments = async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Video.findById(videoId).populate('comments.userId', 'username');
    if (!video) return res.status(404).json({ message: 'Video not found' });

    res.json(video.comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

// Delete a comment from a video
export const deleteComment = async (req, res) => {
  const { videoId, commentId } = req.params;

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.comments = video.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );
    await video.save();

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};
