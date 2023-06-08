const { itemsService } = require('../services');
const {
  createItemService,
} = itemsService;
const Item = require('../models/items.models');

const createItemController = (req, res, next) => {
  // validate model
  const { error, value } = Item.validate(req.body);
  if (error) {
    // Handle validation error
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }


  // call createItem service
  createItemService(value)
    .then((result) => {
      res.status(201).json({
        success: true,
        data: result
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  createItemController,
}