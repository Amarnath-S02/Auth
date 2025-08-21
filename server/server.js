import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";

dotenv.config();

const app = express();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',                   // Local frontend
  'https://auth-sable-kappa.vercel.app'     // Production frontend
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow non-browser requests (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
