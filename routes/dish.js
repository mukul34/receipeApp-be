import { Router } from "express";
import { getDishes } from "../controllers/dish.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();


// router.get("/", authMiddleware, getDishes);
router.get("/", getDishes);

export default router;