import express from 'express';
import { createAnswers, getAnswers } from "../controllers/answer.controller";
import validateJWT from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/", validateJWT, createAnswers);
router.get("/", validateJWT, getAnswers);

export default router;