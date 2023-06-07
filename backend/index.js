require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// any endpoint not starting with /api should throw an error
app.use((req, res, next) => {
  if (!req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ success: false, message: "All endpoints should be pre-appended with '/api' e.g. <HOST ADDRESS>/api" });
  }
  next();
});

const routes = require('./routes');
app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.info(`Server started listening on port ${port}...`);
});