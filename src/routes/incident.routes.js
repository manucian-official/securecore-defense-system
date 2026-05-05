const express = require("express");
const router = express.Router();
const controller = require("../controllers/incident.controller");

// ==============================
// CRUD ROUTES
// ==============================

// GET all incidents
router.get("/", controller.getAll);

// GET incident by ID
router.get("/:id", controller.getById);

// CREATE new incident
router.post("/", controller.create);

// UPDATE incident
router.put("/:id", controller.update);

// DELETE incident
router.delete("/:id", controller.delete);

// ==============================
// RELATION ROUTES
// ==============================

// GET users affected by incident
router.get("/:id/users", controller.getUsers);

// GET tools used in incident
router.get("/:id/tools", controller.getTools);

// ==============================
// OPTIONAL FILTER ROUTE
// ==============================

// Example: /api/incidents/filter?severity=High&status=Ongoing
router.get("/filter/search", (req, res) => {
const filters = {
severity_level: req.query.severity,
status: req.query.status,
device_id: req.query.device_id
};

const Incident = require("../models/incident.model");

Incident.filterIncidents(filters, (err, data) => {
if (err) return res.status(500).json({ error: err.message });
res.json(data);
});
});

module.exports = router;
