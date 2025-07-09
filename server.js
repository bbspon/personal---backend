const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require('./routes/imageRoutes');
const videoRoutes = require("./routes/videoRoutes");
const collaboratorRoutes = require("./routes/collaboratorRoutes");
const contactRoutes = require("./routes/contactRoutes");

const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection using .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Static file handling
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/videos", express.static(path.join(__dirname, "videos")));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/images', imageRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/collaborators", collaboratorRoutes);
app.use("/api/contact", contactRoutes);

console.log("✅ contactRoutes loaded");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
