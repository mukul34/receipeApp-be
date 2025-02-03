import { Router } from "express";
import { createUser, createToken } from "../controllers/auth.js";

const router = Router();


router.post("/create-user", createUser);
router.post("/create-token", createToken);

export default router;