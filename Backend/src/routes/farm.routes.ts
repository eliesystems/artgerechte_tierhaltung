import express from "express";
import { createFarm, getFarms } from "../controllers/farm.controller";
import validateJWT from "../../middlewares/authMiddleware"

const router = express.Router();

router.post("/", validateJWT, createFarm);
router.get("/", validateJWT, getFarms);

export default router;