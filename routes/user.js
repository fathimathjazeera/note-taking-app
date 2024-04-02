import express from "express";
import { login, register } from "../controllers/user.js";
import { tryCatch } from "../middlewares/tryCatch.js";
const router = express.Router();

router.post("/register", tryCatch(register));
router.post("/login", tryCatch(login));

export default router;
