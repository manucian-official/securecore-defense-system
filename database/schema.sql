CREATE TABLE Device (
device_id INT PRIMARY KEY,
device_name VARCHAR(255),
ip_address VARCHAR(50),
operating_system VARCHAR(100),
capacity VARCHAR(50)
);

CREATE TABLE User (
user_id INT PRIMARY KEY,
name VARCHAR(255),
email VARCHAR(255),
phone VARCHAR(50),
role VARCHAR(50)
);

CREATE TABLE Security_Incident (
incident_id INT PRIMARY KEY,
incident_name VARCHAR(255),
incident_type VARCHAR(100),
severity_level VARCHAR(50),
start_time DATETIME,
end_time DATETIME,
status VARCHAR(50),
device_id INT,
FOREIGN KEY (device_id) REFERENCES Device(device_id)
);

CREATE TABLE Security_Tool (
tool_id INT PRIMARY KEY,
tool_name VARCHAR(255),
tool_type VARCHAR(100),
vendor VARCHAR(100),
cost DECIMAL(10,2),
effectiveness_score INT
);

CREATE TABLE Incident_User (
incident_id INT,
user_id INT,
impact_level VARCHAR(50),
PRIMARY KEY (incident_id, user_id),
FOREIGN KEY (incident_id) REFERENCES Security_Incident(incident_id),
FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Incident_Tool (
incident_id INT,
tool_id INT,
response_time INT,
success_rate FLOAT,
PRIMARY KEY (incident_id, tool_id),
FOREIGN KEY (incident_id) REFERENCES Security_Incident(incident_id),
FOREIGN KEY (tool_id) REFERENCES Security_Tool(tool_id)
);
