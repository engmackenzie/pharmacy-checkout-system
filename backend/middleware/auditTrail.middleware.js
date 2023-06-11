const { auditTrailsControllers } = require('../controllers');
const { createAuditTrailController } = auditTrailsControllers;

const auditTrailLogger = (req, res, next) => {
  // Store the original end method of the response object
  const originalEnd = res.end;

  // Create a function to intercept the response
  res.end = function (chunk, encoding) {
    // Log your audit trail information here, using the req and res objects as needed
    console.log('Audit trail:', {
      request: {
        method: req.method,
        url: req.originalUrl,
        // Add any other relevant request data
      },
      response: {
        status: res.statusCode,
        // Add any other relevant response data
      },
    });

    // Call the original end method to send the response to the client
    originalEnd.call(this, chunk, encoding);
  };

  next();
};

module.exports = auditTrailLogger;