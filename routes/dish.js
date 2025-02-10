import { Router } from "express";
import { getDishes, getSuggestions } from "../controllers/dish.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();


// router.get("/", authMiddleware, getDishes);
router.get("/", getDishes);
router.get("/suggestion", getSuggestions);

export default router;