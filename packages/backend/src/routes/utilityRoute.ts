import { Router } from "express";
import { AccessibilityController } from "../controllers/accessibilityController";

const router: Router = Router();

router.post("/analyze-accessibility", AccessibilityController.analyzeAccessibility);

export default router;