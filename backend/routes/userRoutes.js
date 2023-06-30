const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const User = require('../models/User');

router.post('/form', async (req, res) => {
  try {
    const { name, dob, email, phone } = req.body;

    if (!name || !dob || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const ageLimitDate = new Date();
    ageLimitDate.setFullYear(ageLimitDate.getFullYear() - 18);

    if (new Date(dob) > ageLimitDate) {
      return res.status(400).json({ message: 'Age must be 18 years or older' });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone: phone }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone number already exists' });
    }

    const user = await User.create({
      name,
      dob,
      email,
      phone,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
