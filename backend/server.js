const express = require('express');
const app = express();
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

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});