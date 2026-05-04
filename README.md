# 🛡️ SecureCore Defense System (SCDS)

## 📌 Overview

SecureCore Defense System (SCDS) is a cybersecurity incident management platform designed to monitor, analyze, and respond to security threats across devices and users.

---

## 🎯 Features

* Incident tracking and management
* User impact analysis
* Device monitoring
* Security tool integration
* Incident response workflow

---

## 🧩 System Design

### Entities:

* Security_Incident
* User
* Device
* Security_Tool

### Relationships:

* Many-to-Many: Incident ↔ User
* Many-to-Many: Incident ↔ Tool
* Many-to-One: Incident → Device

---

## 🗺️ ERD Diagram

![ERD](docs/ERD.png)

---

## 🔄 Incident Workflow

![Workflow](docs/workflow.png)

---

## 💾 Database Setup

### Run schema:

```bash
mysql -u root -p < database/schema.sql
```

---

## 🧪 Sample Query

```sql
SELECT si.*
FROM Security_Incident si
JOIN Incident_User iu ON si.incident_id = iu.incident_id;
```

---

## 🚀 Future Improvements

* AI-based threat detection
* Real-time dashboard
* Cloud deployment

---

## 📄 License

MIT License
