import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/user.js";
import noteRoutes from "./routes/note.js";
import cors from "cors";
dotenv.config();

const app = express();

const { PORT, MONGODB_URI } = process.env;

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/note", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  connectDb(MONGODB_URI);
});
