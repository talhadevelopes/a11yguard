import { Router } from "express";
import { ChatController } from "../controllers/chatController";

const router : Router = Router();

// POST /api/chat - Process chat questions
router.post("/", ChatController.processChat);

export default router;