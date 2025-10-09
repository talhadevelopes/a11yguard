import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Snapshot, AccessibilityIssue } from "../models";
import { AccessibilityService } from "../services/accessibilityService";
import dotenv from "dotenv";
import { sendError, sendSuccess } from "../types/response";
import { redisClient } from "../index";
dotenv.config();

export class AccessibilityController {
  static async analyzeAccessibility(req: Request, res: Response) {
    try {
      const { html } = req.body;
      if (!html) {
        return sendError(res, 400, "HTML content required", "VALIDATION_ERROR");
      }

      const issues = await AccessibilityService.analyzeHtml(html);
      return sendSuccess(res, { issues });
    } catch (error: any) {
      return sendError(
        res,
        500,
        "Failed to analyze accessibility",
        "SERVER_ERROR"
      );
    }
  }

  static async saveAccessibilityResults(req: AuthRequest, res: Response) {
    try {
      console.log("=== Accessibility Save Request ===");
      console.log("Website ID:", req.params.websiteId);
      console.log("User ID:", req.userId);
      console.log("Request body:", req.body);

      const { issues, analyzedAt } = req.body;
      if (!issues || !analyzedAt || !Array.isArray(issues)) {
        console.log(
          "❌ Missing issues or analyzedAt or issues is not an array"
        );
        return sendError(
          res,
          400,
          "Issues (array) and analyzedAt required",
          "VALIDATION_ERROR"
        );
      }

      // Guard: avoid wiping existing issues when upstream analysis fails and sends []
      if (Array.isArray(issues) && issues.length === 0) {
        console.log(
          "⚠️ Received empty issues array. Skipping overwrite to preserve previous results."
        );
        return sendError(
          res,
          400,
          "No accessibility issues provided. Skipping update.",
          "VALIDATION_ERROR"
        );
      }

      if (!req.params.websiteId || !req.userId) {
        return sendError(
          res,
          400,
          "Website ID and User ID are required",
          "VALIDATION_ERROR"
        );
      }

      console.log("🔍 Looking for existing snapshot...");

      // First try to find the most recent snapshot
      const existingSnapshot = await Snapshot.findOne({
        websiteId: req.params.websiteId,
        userId: req.userId,
      }).sort({ capturedAt: -1 });

      let snapshot: any;
      if (existingSnapshot) {
        console.log(
          "✅ Found existing snapshot:",
          existingSnapshot._id.toString()
        );
        console.log("Updating with accessibility issues...");

        // Delete existing accessibility issues first
        await AccessibilityIssue.deleteMany({
          snapshotId: existingSnapshot._id.toString(),
        });

        // Create new accessibility issues
        await AccessibilityIssue.insertMany(
          issues.map((issue: any) => ({
            snapshotId: existingSnapshot._id.toString(),
            type: issue.type || "unknown",
            message: issue.message || issue.description || "No description",
            source: issue.source,
            context: issue.context,
            selector: issue.selector,
          }))
        );

        // Update the snapshot's analyzedAt
        snapshot = await Snapshot.findByIdAndUpdate(
          existingSnapshot._id,
          { analyzedAt: new Date(analyzedAt) },
          { new: true }
        );

        // Get accessibility issues separately
        const accessibilityIssues = await AccessibilityIssue.find({
          snapshotId: existingSnapshot._id.toString(),
        });
        snapshot = { ...snapshot!.toObject(), accessibilityIssues };

        console.log("✅ Snapshot updated successfully");
      } else {
        console.log("⚠️ No existing snapshot found, creating new one...");

        // Create a new snapshot with accessibility results
        snapshot = await Snapshot.create({
          websiteId: req.params.websiteId,
          userId: req.userId,
          capturedAt: new Date(),
          contentPreview: "Accessibility analysis results",
          analyzedAt: new Date(analyzedAt),
        });

        // Create accessibility issues
        const accessibilityIssues = await AccessibilityIssue.insertMany(
          issues.map((issue: any) => ({
            snapshotId: snapshot._id.toString(),
            type: issue.type || "unknown",
            message: issue.message || issue.description || "No description",
            source: issue.source,
            context: issue.context,
            selector: issue.selector,
          }))
        );

        snapshot = { ...snapshot.toObject(), accessibilityIssues };

        console.log(
          "✅ New snapshot created with accessibility data:",
          snapshot._id.toString()
        );
      }

      return sendSuccess(
        res,
        {
          snapshotId: snapshot._id.toString(),
          issues: snapshot.accessibilityIssues,
        },
        "Accessibility results saved successfully",
        undefined,
        201
      );
    } catch (error: any) {
      console.error("❌ Accessibility save error:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      return sendError(
        res,
        500,
        "Failed to save accessibility results",
        "SERVER_ERROR",
        error.message
      );
    }
  }

  static async getAccessibilityResults(req: AuthRequest, res: Response) {
    try {
      console.log("=== Accessibility Get Request ===");
      console.log("Website ID:", req.params.websiteId);
      console.log("User ID:", req.userId);

      if (!req.params.websiteId || !req.userId) {
        return sendError(
          res,
          400,
          "Website ID and User ID are required",
          "VALIDATION_ERROR"
        );
      }

      // Check cache first (robust: handle closed client, redis errors, and JSON parse errors)
      const cacheKey = `accessibility:${req.userId}:${req.params.websiteId}`;
      if (redisClient?.isOpen) {
        try {
          const cachedData = await redisClient.get(cacheKey);
          if (cachedData) {
            console.log("✅ Cache HIT for accessibility results");
            try {
              const parsed = JSON.parse(cachedData);
              return sendSuccess(
                res,
                parsed,
                "Accessibility results retrieved from cache"
              );
            } catch (parseErr) {
              console.warn(
                "Failed to parse cached accessibility JSON, ignoring cache:",
                parseErr
              );
              // fall through to DB fetch
            }
          } else {
            console.log("❌ Cache MISS for accessibility results");
          }
        } catch (redisErr: any) {
          console.warn(
            "Redis get failed for accessibility cache, continuing without cache:",
            redisErr?.message || redisErr
          );
          // fall through to DB fetch
        }
      } else {
        console.log("Redis client not open, skipping accessibility cache");
      }

      // Find snapshot with accessibility issues
      const snapshot = await Snapshot.findOne({
        websiteId: req.params.websiteId,
        userId: req.userId,
        analyzedAt: { $exists: true },
      }).sort({ analyzedAt: -1 });

      let accessibilityIssues: any[] = [];
      if (snapshot) {
        accessibilityIssues = await AccessibilityIssue.find({
          snapshotId: snapshot._id.toString(),
        });
      }

      if (
        !snapshot ||
        !accessibilityIssues ||
        accessibilityIssues.length === 0
      ) {
        console.log("❌ No accessibility results found");
        return sendError(
          res,
          404,
          "No accessibility results found",
          "NOT_FOUND"
        );
      }

      console.log(
        "✅ Found accessibility results:",
        accessibilityIssues.length,
        "issues"
      );

      const responseData = {
        issues: accessibilityIssues,
        analyzedAt: snapshot.analyzedAt,
      };

      // Cache the response for 10 minutes
      await redisClient.setEx(cacheKey, 600, JSON.stringify(responseData));

      return sendSuccess(res, responseData);
    } catch (error: any) {
      console.error("❌ Accessibility get error:", error);
      return sendError(res, 500, "Server error", "SERVER_ERROR", error.message);
    }
  }

  static async generateAccessibilityRecommendations(
    req: AuthRequest,
    res: Response
  ) {
    try {
      const { issues } = req.body;
      const recommendations =
        await AccessibilityService.generateRecommendations(issues);

      if (
        !recommendations ||
        (typeof recommendations === "string" &&
          recommendations.trim().length === 0)
      ) {
        console.error(
          "AI returned empty accessibility recommendations for issues:",
          issues
        );
        return sendError(
          res,
          502,
          "AI service returned an empty response. Please try again later or check AI configuration.",
          "AI_EMPTY"
        );
      }

      return sendSuccess(res, { recommendations });
    } catch (error: any) {
      console.error("Error generating AI recommendations:", error);

      if (error.message.includes("No accessibility issues provided")) {
        return sendError(res, 400, error.message, "VALIDATION_ERROR");
      }

      if (error.message.includes("Google API key missing")) {
        return sendError(res, 500, error.message, "CONFIG_ERROR");
      }

      if (error.message.includes("temporarily overloaded")) {
        return sendError(res, 503, error.message, "AI_OVERLOADED", {
          retryAfter: 60,
        });
      }

      return sendError(
        res,
        500,
        error.message || "Failed to generate AI recommendations",
        "SERVER_ERROR"
      );
    }
  }

  static async generateCodeFixes(req: AuthRequest, res: Response) {
    try {
      const { issues } = req.body;
      
      if (!issues || !Array.isArray(issues) || issues.length === 0) {
        return sendError(res, 400, "Issues array required", "VALIDATION_ERROR");
      }

      console.log(`🔧 Generating code fixes for ${issues.length} issues...`);
      
      const codeFixes = await AccessibilityService.generateCodeFixes(issues);
      
      if (!codeFixes || codeFixes.length === 0) {
        return sendError(
          res,
          502,
          "AI service could not generate code fixes. Please try again later.",
          "AI_EMPTY"
        );
      }

      console.log(`✅ Generated ${codeFixes.length} code fixes`);
      
      return sendSuccess(res, { codeFixes });
    } catch (error: any) {
      console.error("Error generating code fixes:", error?.message || error);
      
      if (error.message.includes("Missing") && error.message.includes("API")) {
        return sendError(res, 500, "AI service configuration error", "CONFIG_ERROR");
      }
      
      return sendError(
        res,
        500,
        error?.message || "Failed to generate code fixes",
        "SERVER_ERROR"
      );
    }
  }
}
