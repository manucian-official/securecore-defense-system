const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==============================
// MIDDLEWARE
// ==============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// ROOT ROUTE (TEST SERVER)
// ==============================
app.get("/", (req, res) => {
res.json({
message: "🚀 SCDS API is running",
endpoints: {
users: "/api/users",
incidents: "/api/incidents",
devices: "/api/devices",
tools: "/api/tools"
}
});
});

// ==============================
// ROUTES
// ==============================
const userRoutes = require("./routes/user.routes");
const incidentRoutes = require("./routes/incident.routes");
const deviceRoutes = require("./routes/device.routes");
const toolRoutes = require("./routes/tool.routes");

app.use("/api/users", userRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/tools", toolRoutes);

// ==============================
// 404 HANDLER
// ==============================
app.use((req, res) => {
res.status(404).json({
message: "Route not found"
});
});

// ==============================
// GLOBAL ERROR HANDLER
// ==============================
app.use((err, req, res, next) => {
console.error(err.stack);

res.status(500).json({
message: "Internal Server Error",
error: err.message
});
});

module.exports = app;
