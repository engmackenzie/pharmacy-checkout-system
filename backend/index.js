require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const auditTrailLogger = require('./middleware/auditTrail.middleware');
const routes = require('./routes');
const { APIError } = require('./utils/errors');

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

// log all requests
app.use(auditTrailLogger);

app.use('/api', routes);

// error handling
app.use((err, req, res, next) => {
  // Handle the error
  console.error(err);

  if(err instanceof APIError)
    return res.status(err.status).json(err.returnObject);
  
  // Set appropriate status code and send error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.info(`Server started listening on port ${port}...`);
});