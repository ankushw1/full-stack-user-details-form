const express = require('express');
const app = express();
require('dotenv').config();
const formRoutes = require('./routes/formRoutes');

app.use(express.json());
app.use('/form', formRoutes);

const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});