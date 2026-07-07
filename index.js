// backend/server/index.js

const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("data.db");

app.use(cors());
app.use(express.json());

// Create Hospital table
db.exec(`
CREATE TABLE IF NOT EXISTS Hospital (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  Gender TEXT NOT NULL,
  phone TEXT NOT NULL,
  Address TEXT NOT NULL,
  DOF TEXT NOT NULL,
  registered_at TEXT NOT NULL
)
`);

// Add Patient
app.post("/Ho", (req, res) => {
  const { name, age, Gender, phone, Address, DOF } = req.body;

  if (!name || !age || !Gender || !phone || !Address || !DOF) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const time = new Date().toISOString();

  const result = db
    .prepare(
      `INSERT INTO Hospital
      (name, age, Gender, phone, Address, DOF, registered_at)
      VALUES (?,?,?,?,?,?,?)`
    )
    .run(name, age, Gender, phone, Address, DOF, time);

  res.json({
    id: result.lastInsertRowid,
    name,
    age,
    Gender,
    phone,
    Address,
    DOF,
    registered_at: time
  });
});

// Get All Patients
app.get("/hospital", (req, res) => {
  const patients = db
    .prepare("SELECT * FROM Hospital ORDER BY registered_at DESC")
    .all();

  res.json(patients);
});

// Get Patient by ID
app.get("/hospital/:id", (req, res) => {
  const patient = db
    .prepare("SELECT * FROM Hospital WHERE id=?")
    .get(req.params.id);

  if (!patient) {
    return res.status(404).json({
      message: "Patient not found"
    });
  }

  res.json(patient);
});

// Update Patient
app.put("/hospital/:id", (req, res) => {
  const { name, age, Gender, phone, Address, DOF } = req.body;

  const patient = db
    .prepare("SELECT * FROM Hospital WHERE id=?")
    .get(req.params.id);

  if (!patient) {
    return res.status(404).json({
      message: "Patient not found"
    });
  }

  db.prepare(
    `UPDATE Hospital
     SET name=?, age=?, Gender=?, phone=?, Address=?, DOF=?
     WHERE id=?`
  ).run(name, age, Gender, phone, Address, DOF, req.params.id);

  res.json({
    message: "Patient updated"
  });
});

// Delete Patient
app.delete("/hospital/:id", (req, res) => {
  db.prepare("DELETE FROM Hospital WHERE id=?").run(req.params.id);

  res.json({
    message: "Patient deleted"
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});