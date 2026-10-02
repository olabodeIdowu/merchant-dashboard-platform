import app from "./app";
import { config } from "./config";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! ðŸ’¥ Shutting down...");
  console.log(err, err.name, err.message);
  process.exit(1);
});

const server = app.listen(config.port, () => {
  console.log(`🚀 Merchant API running on http://localhost:${config.port}`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
