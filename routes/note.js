import express from "express";
import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../controllers/note.js";
import { tryCatch } from "../middlewares/tryCatch.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/createnote", verifyToken, tryCatch(createNote));
router.get("/getnotes", tryCatch(getAllNotes));
router.put("/updatenote/:id", verifyToken, tryCatch(updateNote));
router.delete("/deletenote/:id", verifyToken, tryCatch(deleteNote));

export default router;
