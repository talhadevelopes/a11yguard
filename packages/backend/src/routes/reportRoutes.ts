import express, { Router } from "express";
import { authenticate } from "../middleware/auth";
import { ReportController } from "../controllers/reportController";

const router : Router = express.Router();

// Generate comprehensive PDF report
router.get("/accessibility-pdf", authenticate, ReportController.generateReport);
router.post("/accessibility-pdf", authenticate, ReportController.generateReport);

export default router;
