const express = require('express');
const router = express.Router();
const monitor = require('../services/monitor');
const dayjs = require('dayjs');

/* GET log. */
router.get('/', function(req, res, next) {
  try {
    const date = dayjs(req.query.date).format('YYYY-MM-DD');
    res.json(monitor.getFromDate(req.query.date));
  } catch(err) {
    console.error(`Error while getting monitor `, err.message);
    next(err);
  }
});


module.exports = router;
