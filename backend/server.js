const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const app = express();
const PORT = 5000;
const JWT_SECRET = 'hamada';
const dbPath = './database/vroomverse.db';

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors()); 

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(`Error connecting to the database: ${err.message}`);
    process.exit(1); 
  }
  console.log('Connected to the SQLite database.');
});

// Initialize database tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `, (err) => {
    if (err) console.error(`Error creating users table: ${err.message}`);
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      price REAL NOT NULL
    )
  `, (err) => {
    if (err) console.error(`Error creating packages table: ${err.message}`);
    else console.log('Packages table created.');
  });

  const checkQuery = `SELECT COUNT(*) AS count FROM packages`;
  db.get(checkQuery, [], (err, row) => {
    if (err) {
      console.error(`Error checking packages table: ${err.message}`);
      return;
    }
    if (row.count === 0) {
      db.run(`
        INSERT INTO packages (name, price) VALUES
        ('Exterior Wash', 10.00),
        ('Complete Wash', 25.00),
        ('Full Detailing Wash', 50.00),
        ('Factory Reset', 100.00)
      `, (err) => {
        if (err) console.error(`Error seeding packages table: ${err.message}`);
        else console.log('Packages table seeded successfully.');
      });
    } else {
      console.log('Packages already exist. Skipping seed.');
    }
  });
});

app.get('/packages', (req, res) => {
  const query = 'SELECT * FROM packages';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(`Error fetching packages: ${err.message}`);
      res.status(500).json({ error: 'Failed to retrieve packages.' });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, hashedPassword], function (err) {
    if (err) {
      console.error(`Error signing up user: ${err.message}`);
      return res.status(400).json({ error: 'Email already in use or invalid input.' });
    }
    res.status(201).json({ id: this.lastID, name, email });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], (err, user) => {
    if (err) {
      console.error(`Error during login: ${err.message}`);
      return res.status(500).json({ error: 'Internal server error.' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful!', token });
  });
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
