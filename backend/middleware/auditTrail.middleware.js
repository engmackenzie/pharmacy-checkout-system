const { v4: uuidv4 } = require('uuid');
const { auditTrailsDatastores } = require('../datastores');
const { createAuditTrailDatastore } = auditTrailsDatastores;

const auditTrailLogger = (req, res, next) => {
    // Store the original end method of the response object
    const originalEnd = res.end;

    // Create a variable to store the response body
    let responseBody = '';

    // Create a function to intercept the response
    res.end = async function (chunk, encoding) {
      // Capture the response body
      if (chunk) {
        responseBody += chunk.toString(encoding || 'utf-8');
      }

      let auditTrail = {};
      let user;
      try {
        user = res.locals?.user;
        if (user) {
          auditTrail = {
            _id: uuidv4(),
            userId: user?._id || "",
            username: `${user?.firstname || ""} ${user?.lastname || ""}` || "",
            userRoleId: user?.roleId || "",
            userRoleName: user?.name || "",
            action: req.method,
            requestUrl: req.originalUrl,
            requestPayload: JSON.stringify(req.body),
            responseCode: res.statusCode,
            responseBody: responseBody,
            createdAt: new Date()
          }
          
          createAuditTrailDatastore(auditTrail);
        }
      } catch (error) {
        console.log('An error occured')
      }

      // Call the original end method to send the response to the client
      originalEnd.call(this, chunk, encoding);
    };

    next();
};

module.exports = auditTrailLogger;