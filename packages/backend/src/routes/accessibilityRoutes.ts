import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { validateWebsiteExists } from "../validations/websiteValidation";
import { AccessibilityController } from "../controllers/accessibilityController";

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
  AccessibilityController.generateAccessibilityRecommendations,
)

// POST /api/accessibility/generate-fixes - Generate code fixes for accessibility issues
router.post(
  "/generate-fixes",
  authenticate,
  AccessibilityController.generateCodeFixes
);

export default router;