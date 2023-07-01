const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PhoneNumber = require('libphonenumber-js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'expense',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/form', (req, res) => {
  const { name, dob, email, phone } = req.body;

  const query = 'INSERT INTO users (name, dob, email, phone) VALUES (?, ?, ?, ?)';
  db.query(query, [name, dob, email, phone], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.sendStatus(500);
    }

    console.log('Data inserted into MySQL');

  });
});

app.get('/form', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving data from MySQL:', err);
      return res.sendStatus(500);
    }

    console.log('Data retrieved from MySQL');
    res.status(200).json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
