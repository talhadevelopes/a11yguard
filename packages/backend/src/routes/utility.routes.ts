import { Router } from "express";
import { AccessibilityController } from "../controllers/accessibility.controller";

const router: Router = Router();

//this is used in extension
router.post("/analyze-accessibility", AccessibilityController.analyzeAccessibility);

export default router;