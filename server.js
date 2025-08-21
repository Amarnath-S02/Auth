import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";


dotenv.config();

const app = express();


const allowedOrigins = [
  'https://auth-sable-kappa.vercel.app',  // your frontend
  'http://localhost:5173'                 // for local testing
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // if you need cookies/auth
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is Connected"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
