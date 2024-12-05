import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import {addComment, getComments, deleteComment} from '../controllers/commentController.js';

const router = express.Router();

router.post('/:videoId', authenticateUser, addComment);
router.get('/:videoId', getComments);
router.delete('/:videoId/:commentId', authenticateUser, deleteComment);

export default router;
