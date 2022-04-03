const express = require('express');
const router = express.Router();
const monitor = require('../services/monitor');
const dayjs = require('dayjs');

/* GET log. */
router.get('/', function(req, res, next) {
  try {
    const date = dayjs(req.query.date).format('YYYY-MM-DD');
    res.json(monitor.getFromDate(date));
  } catch(err) {
    console.error(`Error while getting monitor `, err.message);
    next(err);
  }
});

/* GET log. */
router.get('/log', function(req, res, next) {
  try {
    const interval = req.query.interval;
    if (interval === null || interval === undefined){
      throw('missing parameter');
    }
    res.json(monitor.getFromInterval(interval));
  } catch(err) {
    console.error(`Error while getting monitor `, err.message);
    next(err);
  }
});


module.exports = router;
