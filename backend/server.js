const express = require('express');
const app = express();
require('dotenv').config();
const formRoutes = require('./routes/formRoutes');
const cors = require('cors')

app.use(cors(
  {
      origin: ["https://deploy-mern-frontend.vercel.app"],
      methods: ["POST", "GET"],
      credentials: true
  }
));

app.use(express.json());
app.use('/form', formRoutes);

const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});