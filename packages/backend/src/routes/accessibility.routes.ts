import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { validateWebsiteExists } from "../validations/websiteValidation";
import { AccessibilityAIServiceController, AccessibilityController } from "../controllers/accessibility.controller";

const router : Router = Router();

// POST /api/websites/:websiteId/accessibility - Save accessibility results
router.post(
  "/:websiteId/accessibility",
  authenticate,
  validateWebsiteExists,
  AccessibilityController.saveAccessibilityResults
);

// GET /api/websites/:websiteId/accessibility - Get accessibility results
router.get(
  "/:websiteId/accessibility",
  authenticate,
  validateWebsiteExists,
  AccessibilityController.getAccessibilityResults
);

router.post(
  "/:websiteId/recommendations",
  authenticate, 
  AccessibilityAIServiceController.generateAccessibilityRecommendations,
)

// POST /api/accessibility/generate-fixes - Generate code fixes for accessibility issues
router.post(
  "/generate-fixes",
  authenticate,
  AccessibilityAIServiceController.generateCodeFixes
);

export default router;