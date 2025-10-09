import { Request, Response } from "express";
import { ChatService } from "../services/chatService";
import { ChatRequest } from "../types";
import { sendError, sendSuccess } from "../types/response";

export class ChatController {
  static async processChat(req: Request, res: Response) {
    try {
      const { textContent, question, url, expertType } = req.body;
      if (!textContent || !question || !url) {
        return sendError(res, 400, "Missing text content, question, or URL", "VALIDATION_ERROR");
      }

      const chatRequest: ChatRequest = { textContent, question, url, expertType };
      const answer = await ChatService.processQuestion(chatRequest);
      return sendSuccess(res, { answer });
    } catch (error: any) {
      return sendError(res, 500, "Failed to process question. Try again!", "SERVER_ERROR");
    }
  }
}