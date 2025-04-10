import express from 'express';
import { saveUserIdToDb } from '../controllers/user.controller';
import validateJWT from '../../middlewares/authMiddleware';

const router = express.Router();

router.post("/", validateJWT, saveUserIdToDb);

export default router;