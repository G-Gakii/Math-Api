import { Router } from "express";
import aboutNumber from "../controllers/math.controllers";

const router = Router();

router.get("/classify-number", aboutNumber);

export default router;
