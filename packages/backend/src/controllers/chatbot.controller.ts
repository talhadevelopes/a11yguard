import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { ChatbotService } from "../services/chatbot.service";
import { sendError, sendSuccess } from "../types/response.types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class ChatbotController {
  /**
   * Handle chat query with accessibility context
   */
  static async chat(req: AuthRequest, res: Response) {
    try {
      const { query, snapshotId, conversationHistory } = req.body;

      // Validation
      if (!query || typeof query !== "string" || query.trim().length === 0) {
        return sendError(res, 400, "Query is required", "VALIDATION_ERROR");
      }

      if (!snapshotId || typeof snapshotId !== "string") {
        return sendError(res, 400, "Snapshot ID is required", "VALIDATION_ERROR");
      }

      if (!req.userId) {
        return sendError(res, 401, "Unauthorized", "AUTH_ERROR");
      }

      // Validate conversation history format
      let history: ChatMessage[] = [];
      if (conversationHistory && Array.isArray(conversationHistory)) {
        history = conversationHistory.filter(
          (msg: any) =>
            msg.role &&
            (msg.role === "user" || msg.role === "assistant") &&
            typeof msg.content === "string"
        );
      }

      console.log(`💬 Chat query: "${query.substring(0, 50)}..."`);
      console.log(`📸 Snapshot ID: ${snapshotId}`);
      console.log(`📜 History length: ${history.length}`);

      // Get website ID from snapshot (you'll need to fetch this)
      const websiteId = req.params.websiteId || req.body.websiteId;
      
      if (!websiteId) {
        return sendError(
          res,
          400,
          "Website ID is required",
          "VALIDATION_ERROR"
        );
      }

      // Generate response
      const response = await ChatbotService.generateResponse(
        query,
        {
          snapshotId,
          userId: req.userId,
          websiteId,
        },
        history
      );

      console.log(`✅ Generated response (${response.length} chars)`);

      return sendSuccess(res, {
        response,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("Chatbot controller error:", error);

      if (error.message.includes("Rate limit")) {
        return sendError(res, 429, error.message, "RATE_LIMIT");
      }

      if (error.message.includes("temporarily unavailable")) {
        return sendError(res, 503, error.message, "SERVICE_UNAVAILABLE");
      }

      if (error.message.includes("Snapshot not found")) {
        return sendError(res, 404, error.message, "NOT_FOUND");
      }

      return sendError(
        res,
        500,
        error?.message || "Failed to process chat request",
        "SERVER_ERROR"
      );
    }
  }

  /**
   * Get suggested questions based on current issues
   */
  static async getSuggestedQuestions(req: AuthRequest, res: Response) {
    try {
      const { snapshotId } = req.params;

      if (!snapshotId) {
        return sendError(
          res,
          400,
          "Snapshot ID is required",
          "VALIDATION_ERROR"
        );
      }

      // Return context-aware suggested questions
      const suggestions = [
        "What should I fix first?",
        "Explain the High priority issues",
        "How do I fix the heading-order violations?",
        "Generate code fix for color contrast issues",
        "Which issues affect screen readers the most?",
      ];

      return sendSuccess(res, { suggestions });
    } catch (error: any) {
      console.error("Error getting suggested questions:", error);
      return sendError(res, 500, "Server error", "SERVER_ERROR");
    }
  }
}