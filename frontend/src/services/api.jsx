import axios from "axios";

export const fetchVideos = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/videos"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error; 
  }
};

export const fetchVideoById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

