const db = require("../config/db");

// ==============================
// GET ALL INCIDENTS
// ==============================
exports.getAllIncidents = (callback) => {
const sql = `     SELECT si.*, d.device_name
    FROM Security_Incident si
    LEFT JOIN Device d ON si.device_id = d.device_id
    ORDER BY si.start_time DESC
  `;
db.query(sql, callback);
};

// ==============================
// GET INCIDENT BY ID
// ==============================
exports.getIncidentById = (id, callback) => {
const sql = `     SELECT si.*, d.device_name
    FROM Security_Incident si
    LEFT JOIN Device d ON si.device_id = d.device_id
    WHERE si.incident_id = ?
  `;
db.query(sql, [id], callback);
};

// ==============================
// CREATE INCIDENT
// ==============================
exports.createIncident = (data, callback) => {
const sql = `     INSERT INTO Security_Incident
    (incident_name, incident_type, severity_level, start_time, end_time, status, device_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

const values = [
data.incident_name,
data.incident_type,
data.severity_level,
data.start_time || new Date(),
data.end_time || null,
data.status || "Ongoing",
data.device_id
];

db.query(sql, values, callback);
};

// ==============================
// UPDATE INCIDENT
// ==============================
exports.updateIncident = (id, data, callback) => {
const sql = `     UPDATE Security_Incident
    SET incident_name = ?,
        incident_type = ?,
        severity_level = ?,
        end_time = ?,
        status = ?,
        device_id = ?
    WHERE incident_id = ?
  `;

const values = [
data.incident_name,
data.incident_type,
data.severity_level,
data.end_time,
data.status,
data.device_id,
id
];

db.query(sql, values, callback);
};

// ==============================
// DELETE INCIDENT
// ==============================
exports.deleteIncident = (id, callback) => {
db.query(
"DELETE FROM Security_Incident WHERE incident_id = ?",
[id],
callback
);
};

// ==============================
// GET USERS AFFECTED BY INCIDENT
// ==============================
exports.getUsersByIncident = (incidentId, callback) => {
const sql = `     SELECT u.user_id, u.name, u.email, iu.impact_level
    FROM Incident_User iu
    JOIN User u ON iu.user_id = u.user_id
    WHERE iu.incident_id = ?
  `;
db.query(sql, [incidentId], callback);
};

// ==============================
// GET TOOLS USED IN INCIDENT
// ==============================
exports.getToolsByIncident = (incidentId, callback) => {
const sql = `     SELECT st.tool_id, st.tool_name, it.response_time, it.success_rate
    FROM Incident_Tool it
    JOIN Security_Tool st ON it.tool_id = st.tool_id
    WHERE it.incident_id = ?
  `;
db.query(sql, [incidentId], callback);
};

// ==============================
// FILTER INCIDENTS (OPTIONAL)
// ==============================
exports.filterIncidents = (filters, callback) => {
let sql = `SELECT * FROM Security_Incident WHERE 1=1`;
let values = [];

if (filters.severity_level) {
sql += " AND severity_level = ?";
values.push(filters.severity_level);
}

if (filters.status) {
sql += " AND status = ?";
values.push(filters.status);
}

if (filters.device_id) {
sql += " AND device_id = ?";
values.push(filters.device_id);
}

db.query(sql, values, callback);
};
