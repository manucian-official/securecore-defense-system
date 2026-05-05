const db = require("../config/db");

// ==============================
// GET ALL TOOLS
// ==============================
exports.getAllTools = (callback) => {
const sql = `     SELECT st.*, COUNT(it.incident_id) AS total_used
    FROM Security_Tool st
    LEFT JOIN Incident_Tool it ON st.tool_id = it.tool_id
    GROUP BY st.tool_id
    ORDER BY total_used DESC
  `;
db.query(sql, callback);
};

// ==============================
// GET TOOL BY ID
// ==============================
exports.getToolById = (id, callback) => {
const sql = `SELECT * FROM Security_Tool WHERE tool_id = ?`;
db.query(sql, [id], callback);
};

// ==============================
// CREATE TOOL
// ==============================
exports.createTool = (data, callback) => {
const sql = `     INSERT INTO Security_Tool
    (tool_name, tool_type, vendor, cost, effectiveness_score)
    VALUES (?, ?, ?, ?, ?)
  `;

const values = [
data.tool_name,
data.tool_type,
data.vendor,
data.cost || 0,
data.effectiveness_score || 0
];

db.query(sql, values, callback);
};

// ==============================
// UPDATE TOOL
// ==============================
exports.updateTool = (id, data, callback) => {
const sql = `     UPDATE Security_Tool
    SET tool_name = ?,
        tool_type = ?,
        vendor = ?,
        cost = ?,
        effectiveness_score = ?
    WHERE tool_id = ?
  `;

const values = [
data.tool_name,
data.tool_type,
data.vendor,
data.cost,
data.effectiveness_score,
id
];

db.query(sql, values, callback);
};

// ==============================
// DELETE TOOL
// ==============================
exports.deleteTool = (id, callback) => {
db.query(
"DELETE FROM Security_Tool WHERE tool_id = ?",
[id],
callback
);
};

// ==============================
// GET INCIDENTS USING THIS TOOL
// ==============================
exports.getToolIncidents = (toolId, callback) => {
const sql = `     SELECT si.incident_id, si.incident_name, si.severity_level, si.status
    FROM Incident_Tool it
    JOIN Security_Incident si ON it.incident_id = si.incident_id
    WHERE it.tool_id = ?
    ORDER BY si.start_time DESC
  `;
db.query(sql, [toolId], callback);
};

// ==============================
// TOOL STATS (ADVANCED)
// ==============================
exports.getToolStats = (toolId, callback) => {
const sql = `     SELECT 
      COUNT(*) AS total_used,
      AVG(success_rate) AS avg_success_rate,
      AVG(response_time) AS avg_response_time
    FROM Incident_Tool
    WHERE tool_id = ?
  `;
db.query(sql, [toolId], callback);
};

// ==============================
// FILTER TOOLS
// ==============================
exports.filterTools = (filters, callback) => {
let sql = `SELECT * FROM Security_Tool WHERE 1=1`;
let values = [];

if (filters.tool_type) {
sql += " AND tool_type = ?";
values.push(filters.tool_type);
}

if (filters.vendor) {
sql += " AND vendor = ?";
values.push(filters.vendor);
}

if (filters.min_score) {
sql += " AND effectiveness_score >= ?";
values.push(filters.min_score);
}

db.query(sql, values, callback);
};
