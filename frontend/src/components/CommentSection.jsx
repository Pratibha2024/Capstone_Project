import React, { useState } from 'react';
import axios from 'axios';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    axios.get(`/api/videos/${videoId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.log(error));
  }, [videoId]);

  const handleCommentSubmit = () => {
    const newComment = { text: commentText };
    axios.post(`/api/videos/${videoId}/comments`, newComment)
      .then(response => setComments([...comments, response.data]))
      .catch(error => console.log(error));
    setCommentText('');
  };

  return (
    <div>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="border-b py-2">
            <p className="font-semibold">{comment.user}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-4 border rounded-lg"
          placeholder="Add a comment..."
        ></textarea>
        <button
          onClick={handleCommentSubmit}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
