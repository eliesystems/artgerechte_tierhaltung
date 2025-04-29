import express from 'express';
import { createAnswers, getAnswers, getAnswersByFarmId, updateAnswers } from "../controllers/answer.controller";
import validateJWT from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/", validateJWT, createAnswers);
router.get("/", validateJWT, getAnswers);
router.get("/farmId", validateJWT, getAnswersByFarmId);
router.patch("/", validateJWT, updateAnswers)

export default router;