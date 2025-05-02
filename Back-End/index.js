const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Connect to the database
const db = new sqlite3.Database('./db/careers.db', (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to careers.db");
  }
});

// Create careers table and seed sample data
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS careers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    field TEXT,
    education TEXT,
    median_salary INTEGER,
    growth_rate TEXT
  )`);

  const sampleCareers = [
    ["Software Engineer", "Develops and maintains software systems", "Technology", "Bachelor's", 95000, "High"],
    ["Registered Nurse", "Provides care to patients in hospitals and clinics", "Healthcare", "Associate's or Bachelor's", 75000, "High"],
    ["Marketing Manager", "Leads marketing strategies and campaigns", "Business", "Bachelor's", 88000, "Medium"],
    ["Teacher", "Educates students in schools", "Education", "Bachelor's", 60000, "Stable"]
  ];

  const insertStmt = db.prepare(
    `INSERT INTO careers (title, description, field, education, median_salary, growth_rate)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  sampleCareers.forEach(career => {
    insertStmt.run(career);
  });

  insertStmt.finalize();
});

// GET all careers
app.get('/careers', (req, res) => {
  db.all('SELECT * FROM careers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET career by ID
app.get('/careers/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM careers WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Career not found" });
    res.json(row);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
