import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.routes";
import { connectDatabase } from "./utils/database";
import { sendError, sendSuccess } from "./types/response.types";
import { createClient, RedisClientType } from "redis";
import hpp from "hpp";
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize'
import { createServer } from "http";
import { Server } from "socket.io";
import { initChatSockets } from "./sockets/chat";
import { bindPresenceRedis } from "./controllers/presence.controller";
dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
let socketOptions: any = undefined;
try {
  const parsed = new URL(redisUrl);
  if (parsed.protocol === "rediss:") {
    // when using TLS, set servername (SNI) to the hostname from the URL
    // and allow self-signed certs in dev by rejecting unauthorized = false
    socketOptions = {
      tls: true,
      rejectUnauthorized: false,
      servername: parsed.hostname,
    };
  }
} catch (err) {
  console.warn("Invalid REDIS_URL format:", process.env.REDIS_URL, err);
}

export const redisClient: RedisClientType = createClient({
  url: redisUrl,
  socket: socketOptions,
});
redisClient.on("error", (err) => console.error("Redis Client Error:", err));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Connected to Redis Cloud");
  }
};

// Start server function
export const startServer = async () => {
  try {
    // Connect to database first
    await connectDatabase();

   await connectRedis();
    console.log("✅ Connected to Redis");

    const app = express();
    const PORT = 4000;

    // Middleware
    app.use(express.json({ limit: "50mb" }));
    app.use(helmet());
    app.use(hpp());
    app.use(mongoSanitize());
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

    // CORS configuration
    const allowedOrigins = [
      process.env.CLIENT_URL || "http://localhost:5173",
      /^chrome-extension:\/\/[a-z]+$/,
    ];
    app.use(
      cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Added more methods
        credentials: true, // Allow cookies/auth headers
      })
    );

    // Health check endpoint
    app.get("/api/health", async (req, res) => {
      try {
        // Check if mongoose is connected
        if (mongoose.connection.readyState !== 1) {
          throw new Error("Database not connected");
        }
        await redisClient.ping(); // This will throw if Redis is down

        return sendSuccess(
          res,
          {
            database: "connected",
            timestamp: new Date().toISOString(),
          },
          "ok"
        );
      } catch (error) {
        console.error("Health check failed:", error);
        return sendError(res, 500, "error", "HEALTH_ERROR", {
          database: "disconnected",
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Routes
    app.use("/api/auth", routes.auth);
    app.use("/api/websites", routes.websites);
    app.use("/api/websites", routes.snapshots);
    app.use("/api/websites", routes.accessibility);
    app.use("/api/accessibility", routes.accessibility); // Add standalone accessibility routes
    // app.use("/api/chat", routes.chat);
    app.use("/api/members", routes.members);
    app.use("/api/chat", routes.chatbot); // ADD THIS LINE
    app.use("/api", routes.utility);
    app.use("/api/messages", routes.messages);
    app.use("/api/presence", routes.presence);

    // 404 handler
    app.use("*", (req, res) => {
      return sendError(res, 404, "Route not found", "NOT_FOUND", {
        path: req.originalUrl,
      });
    });

    // Global error handler
    app.use(
      (
        error: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.error("Server error:", error);
        return sendError(
          res,
          500,
          process.env.NODE_ENV === "development"
            ? error?.message || "Internal server error"
            : "Something went wrong",
          "SERVER_ERROR"
        );
      }
    );

    // Start the server with Socket.IO
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    initChatSockets(io, redisClient);
    bindPresenceRedis(redisClient);

    const server = httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });

    //shutdown function
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        console.log("✅ Server closed");

        try {
          await mongoose.disconnect();
          console.log("✅ Database disconnected");
          process.exit(0);
        } catch (error) {
          console.error("❌ Error during shutdown:", error);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds if graceful shutdown hangs
      setTimeout(() => {
        console.error("⚠️ Forcing shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    // Use the same function for both signals
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    // Don't return the app, just return void
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}
