const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require('./routes/imageRoutes');
const videoRoutes = require("./routes/videoRoutes");
const collaboratorRoutes = require("./routes/collaboratorRoutes");
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const businessInterestRoutes = require("./routes/businessInterestRoute");
const galleryRoutes = require("./routes/galleryRoutes");

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

// Root route - API status
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API is running successfully! 🚀',
    status: 'online',
    timestamp: new Date().toISOString(),
    availableRoutes: [
      '/api/auth',
      '/api/images',
      '/api/videos',
      '/api/collaborators',
      '/api/contact',
      '/api/appointments',
      '/api/admin',
      '/api/business-interest',
      '/api/gallery'
    ]
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/images', imageRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/collaborators", collaboratorRoutes);
app.use("/api/contact", contactRoutes);
// Temporarily commenting out problematic routes to identify the issue
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/business-interest", businessInterestRoutes);
// app.use("/api/gallery", galleryRoutes);

console.log("✅ contactRoutes loaded");

// Root route for API status
app.get('/', (req, res) => {
  res.json({
    message: "Backend API is running successfully! 🚀",
    status: "online",
    timestamp: new Date().toISOString(),
    availableRoutes: [
      "/api/auth",
      "/api/images",
      "/api/videos",
      "/api/collaborators",
      "/api/contact",
      "/api/appointments",
      "/api/admin",
      "/api/business-interest",
      "/api/gallery"
    ]
  });
});

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist`,
    availableRoutes: [
      '/',
      '/api/auth',
      '/api/images',
      '/api/videos',
      '/api/collaborators',
      '/api/contact',
      '/api/appointments',
      '/api/admin',
      '/api/business-interest',
      '/api/gallery'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Visit http://localhost:${PORT} to see the API status`);
});
