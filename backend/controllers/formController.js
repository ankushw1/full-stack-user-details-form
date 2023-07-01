const db = require('../utils/database');

exports.submitForm = (req, res) => {
  const { name, email, dob, phone } = req.body;
  const sql = 'INSERT INTO users (name, email, dob, phone) VALUES (?, ?, ?, ?)';
  const values = [name, email, dob, phone];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      return res.status(500).json('Error inserting data');
    }

    return res.json('Success');
  });
};

exports.getFormData = (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data from the database:', err);
      return res.status(500).json('Error retrieving data');
    }

    return res.json(results);
  });
};
