import express from "express";
import { createFarm, getFarmsByUserId } from "../controllers/farm.controller";
import validateJWT from "../../middlewares/authMiddleware"

const router = express.Router();

router.post("/", validateJWT, createFarm);
router.get("/", validateJWT, getFarmsByUserId);

export default router;