// import mongoose from "mongoose";

// // Connect to MongoDB
// mongoose.connect(url);

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Define Schemas
// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
//   channelName: String,
// });

// const VideoSchema = new mongoose.Schema({
//   videoId: String,
//   title: String,
//   thumbnailUrl: String,
//   description: String,
//   channelId: mongoose.Schema.Types.ObjectId,
//   uploader: String,
//   views: Number,
//   likes: Number,
//   dislikes: Number,
//   uploadDate: Date,
//   category: String,
//   comments: [
//     {
//       commentId: String,
//       userId: mongoose.Schema.Types.ObjectId,
//       text: String,
//       timestamp: Date,
//     },
//   ],
// });

// // Define Models
// const User = mongoose.model("User", UserSchema);
// const Video = mongoose.model("Video", VideoSchema);

// // Sample Data
// const users = [
//   {
//     username: "JohnDoe",
//     email: "john@example.com",
//     password: "password123", 
//     channelName: "John's Channel",
//   },
//   {
//     username: "JaneSmith",
//     email: "jane@example.com",
//     password: "password456",
//     channelName: "Jane's World",
//   },
// ];

// const videos = [
//   {
//     videoId: "video01",
//     title: "Learn React in 30 Minutes",
//     thumbnailUrl: "https://via.placeholder.com/300x200?text=React+30+Minutes",
//     description: "A quick tutorial to get started with React.",
//     uploader: "JohnDoe",
//     views: 15200,
//     likes: 1023,
//     dislikes: 45,
//     uploadDate: new Date("2024-09-20"),
//     category: "Education",
//     comments: [
//       {
//         commentId: "comment01",
//         userId: null, // Will be populated later
//         text: "Great video! Very helpful.",
//         timestamp: new Date("2024-09-21T08:30:00Z"),
//       },
//     ],
//   },
//   {
//     videoId: "video02",
//     title: "Top 10 Coding Tips",
//     thumbnailUrl: "https://via.placeholder.com/300x200?text=Coding+Tips",
//     description: "Improve your coding skills with these 10 tips.",
//     uploader: "JaneSmith",
//     views: 10100,
//     likes: 800,
//     dislikes: 20,
//     uploadDate: new Date("2024-09-15"),
//     category: "Tech",
//     comments: [],
//   },
// ];

// // Insert Data
// async function seedDatabase() {
//   try {
//     await User.deleteMany({});
//     await Video.deleteMany({});

//     const insertedUsers = await User.insertMany(users);

//     // Update video comments with user IDs
//     videos[0].comments[0].userId = insertedUsers[0]._id;

//     videos.forEach((video, index) => {
//       video.channelId = insertedUsers[index % insertedUsers.length]._id;
//     });

//     await Video.insertMany(videos);
//     process.exit();
//   } catch (error) {
//     process.exit(1);
//   }}

// seedDatabase();
