import express from 'express';
import { createChannel, getChannelVideos, deleteVideo, updateVideo } from '../controllers/channelController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createChannel);
router.get('/:channelId/videos', authenticateUser, getChannelVideos);
router.delete('/videos/:videoId', authenticateUser, deleteVideo);
router.put('/videos/:videoId', authenticateUser, updateVideo);

export default router;
