var express = require('express');
var router = express.Router();
var WorkOrderModel = require('../models/WorkOrderModel');


module.exports.postWorkOrder = function (req, res) {
  WorkOrderModel.postWorkOrder(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};
