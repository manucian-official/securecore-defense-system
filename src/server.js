require("dotenv").config();
const app = require("./app");

// ==============================
// CONFIG
// ==============================
const PORT = process.env.PORT || 3000;

// ==============================
// START SERVER
// ==============================
const server = app.listen(PORT, () => {
console.log("=================================");
console.log("🚀 SecureCore Defense System API");
console.log(`🌐 Running on: http://localhost:${PORT}`);
console.log("=================================");
});

// ==============================
// HANDLE ERRORS
// ==============================
process.on("uncaughtException", (err) => {
console.error("❌ Uncaught Exception:", err.message);
process.exit(1);
});

process.on("unhandledRejection", (err) => {
console.error("❌ Unhandled Rejection:", err.message);
server.close(() => process.exit(1));
});

// ==============================
// GRACEFUL SHUTDOWN
// ==============================
process.on("SIGINT", () => {
console.log("\n🛑 Server shutting down...");
server.close(() => {
console.log("✅ Server stopped");
process.exit(0);
});
});
