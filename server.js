require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', require('./src/routes'));
app.use(express.static('public'));

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
