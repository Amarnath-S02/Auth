import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";

dotenv.config();

const app = express();




// CORS middleware
import cors from "cors";

const allowedOrigins = [
  "https://auth-sable-kappa.vercel.app", // your deployed frontend
  "http://localhost:5173"                 // local dev
];

app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true); // allow server-to-server requests
    if(!allowedOrigins.includes(origin)) {
      return callback(new Error(`CORS policy does not allow access from ${origin}`), false);
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
