-- =========================
-- SEED DATA FOR SCDS
-- =========================

-- Devices
INSERT INTO Device (device_id, device_name, ip_address, operating_system, capacity) VALUES
(1, 'PC-01', '192.168.1.10', 'Windows 10', '8GB RAM'),
(2, 'Server-01', '192.168.1.20', 'Linux Ubuntu', '32GB RAM'),
(3, 'Laptop-Dev', '192.168.1.30', 'Windows 11', '16GB RAM');

-- Users
INSERT INTO User (user_id, name, email, phone, role) VALUES
(1, 'Nguyen Van A', '[a@gmail.com](mailto:a@gmail.com)', '0123456789', 'employee'),
(2, 'Tran Thi B', '[b@gmail.com](mailto:b@gmail.com)', '0987654321', 'admin'),
(3, 'Le Van C', '[c@gmail.com](mailto:c@gmail.com)', '0111222333', 'employee'),
(4, 'Pham Thi D', '[d@gmail.com](mailto:d@gmail.com)', '0222333444', 'employee');

-- Security Tools
INSERT INTO Security_Tool (tool_id, tool_name, tool_type, vendor, cost, effectiveness_score) VALUES
(1, 'Windows Defender', 'Antivirus', 'Microsoft', 0.00, 75),
(2, 'Cloudflare Firewall', 'Firewall', 'Cloudflare', 200.00, 90),
(3, 'Snort IDS', 'IDS', 'Cisco', 150.00, 85),
(4, 'Kaspersky', 'Antivirus', 'Kaspersky', 100.00, 88);

-- Security Incidents
INSERT INTO Security_Incident (incident_id, incident_name, incident_type, severity_level, start_time, end_time, status, device_id) VALUES
(1, 'Malware Attack', 'Malware', 'High', '2026-01-01 10:00:00', '2026-01-01 12:00:00', 'Resolved', 1),
(2, 'DDoS Attack', 'DDoS', 'Critical', '2026-01-02 14:00:00', NULL, 'Ongoing', 2),
(3, 'Phishing Attempt', 'Phishing', 'Medium', '2026-01-03 09:00:00', '2026-01-03 10:00:00', 'Resolved', 3);

-- Incident_User (Many-to-Many)
INSERT INTO Incident_User (incident_id, user_id, impact_level) VALUES
(1, 1, 'High'),
(1, 3, 'Medium'),
(2, 1, 'Critical'),
(2, 2, 'High'),
(2, 3, 'Medium'),
(2, 4, 'Low'),
(3, 4, 'Medium');

-- Incident_Tool (Many-to-Many)
INSERT INTO Incident_Tool (incident_id, tool_id, response_time, success_rate) VALUES
(1, 1, 30, 0.85),
(1, 4, 25, 0.90),
(2, 2, 60, 0.95),
(2, 3, 45, 0.88),
(3, 1, 20, 0.80);
