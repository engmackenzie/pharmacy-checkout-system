const { v4: uuidv4 } = require('uuid');
const { AuditTrail } = require('../models');
const { APIError } = require('../utils/errors');
const { auditTrailsDatastores } = require('../datastores');
const { 
  createAuditTrailDatastore,
  getAuditTrailDatastore,
  getAuditTrailsDatastore
 } = auditTrailsDatastores;

const createAuditTrailController = async (req, res) => {
  try {
    // validate model
    let data = req.body;
    data._id = uuidv4();
    data.createdAt = new Date();
    const { error, value } = AuditTrail.validate(data);
    if (error) throw new APIError(error.message, 400);

    // call createAuditTrail datastore
    await createAuditTrailDatastore(value);

    return res.status(201).json({ success: true, message: 'AuditTrail created successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to create auditTrail' });
  }
};

const getAuditTrailController = async (req, res) => {
  try {
    // call get auditTrail datastore
    const { _id } = req.params;
    const auditTrail = await getAuditTrailDatastore(_id);
    if (!auditTrail) throw new APIError('No auditTrail found for that id', 404);

    return res.status(200).json({ success: true, data: auditTrail });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get auditTrail' });
  }
};

const getAuditTrailsController = async (req, res) => {
  try {
    const auditTrails = await getAuditTrailsDatastore(req.query);
    return res.status(200).json({ success: true, data: auditTrails });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get auditTrails' });
  }
};

module.exports = {
  createAuditTrailController,
  getAuditTrailController,
  getAuditTrailsController
}