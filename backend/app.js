const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());

app.use('/', userRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
