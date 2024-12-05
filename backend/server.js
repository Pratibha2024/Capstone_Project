import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import channelRoutes from './routes/channelRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());  

// Routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/channels', channelRoutes);

// Connect to MongoDB
mongoose.connect(process.env.url)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start server
app.listen(5000, () => {
  console.log('Server is running');
});
