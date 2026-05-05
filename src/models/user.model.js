const db = require("../config/db");

// ==============================
// GET ALL USERS
// ==============================
exports.getAllUsers = (callback) => {
const sql = `     SELECT u.*, COUNT(iu.incident_id) AS total_incidents
    FROM User u
    LEFT JOIN Incident_User iu ON u.user_id = iu.user_id
    GROUP BY u.user_id
    ORDER BY u.user_id DESC
  `;
db.query(sql, callback);
};

// ==============================
// GET USER BY ID
// ==============================
exports.getUserById = (id, callback) => {
db.query(
"SELECT * FROM User WHERE user_id = ?",
[id],
callback
);
};

// ==============================
// CREATE USER
// ==============================
exports.createUser = (data, callback) => {
const sql = `     INSERT INTO User (name, email, phone, role)
    VALUES (?, ?, ?, ?)
  `;

const values = [
data.name,
data.email,
data.phone,
data.role || "employee"
];

db.query(sql, values, callback);
};

// ==============================
// UPDATE USER
// ==============================
exports.updateUser = (id, data, callback) => {
const sql = `     UPDATE User
    SET name = ?, email = ?, phone = ?, role = ?
    WHERE user_id = ?
  `;

db.query(sql, [
data.name,
data.email,
data.phone,
data.role,
id
], callback);
};

// ==============================
// DELETE USER
// ==============================
exports.deleteUser = (id, callback) => {
db.query(
"DELETE FROM User WHERE user_id = ?",
[id],
callback
);
};

// ==============================
// GET INCIDENTS OF A USER
// ==============================
exports.getUserIncidents = (userId, callback) => {
const sql = `     SELECT si.incident_id, si.incident_name, si.severity_level, iu.impact_level
    FROM Incident_User iu
    JOIN Security_Incident si ON iu.incident_id = si.incident_id
    WHERE iu.user_id = ?
    ORDER BY si.start_time DESC
  `;
db.query(sql, [userId], callback);
};

// ==============================
// USER STATS (ADVANCED)
// ==============================
exports.getUserStats = (userId, callback) => {
const sql = `     SELECT 
      COUNT(*) AS total_incidents,
      SUM(CASE WHEN severity_level = 'Critical' THEN 1 ELSE 0 END) AS critical_count,
      SUM(CASE WHEN severity_level = 'High' THEN 1 ELSE 0 END) AS high_count
    FROM Incident_User iu
    JOIN Security_Incident si ON iu.incident_id = si.incident_id
    WHERE iu.user_id = ?
  `;
db.query(sql, [userId], callback);
};
