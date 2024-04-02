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

router.post("/create", verifyToken, tryCatch(createNote));
router.get("/getnotes", tryCatch(getAllNotes));
router.put("/update", verifyToken, tryCatch(updateNote));
router.post("/delete", verifyToken, tryCatch(deleteNote));

export default router;
