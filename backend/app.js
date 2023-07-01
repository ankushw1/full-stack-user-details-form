const express = require('express');
const app = express();
const formRoutes = require('./routes/formRoutes');

app.use(express.json());
app.use('/form', formRoutes);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});