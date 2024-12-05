import express from 'express';
import { getVideos, getVideo, createVideo, deleteVideo } from '../controllers/videoController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getVideos);
router.get('/:id', getVideo);
router.post('/', authenticateUser, createVideo);
router.delete('/:id', authenticateUser, deleteVideo);

export default router;
