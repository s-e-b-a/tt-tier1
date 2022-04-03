const express = require('express');
const router = express.Router();
const monitor = require('../services/monitor');
const dayjs = require('dayjs');
/*const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);*/

/* GET log. */
router.get('/all_day', function(req, res, next) {
  try {
    const date = dayjs(req.query.date).format('YYYY-MM-DD');
    res.json(monitor.getFromDate(date));
  } catch(err) {
    console.error(`Error while getting monitor `, err.message);
    next(err);
  }
});

/* GET log. */
router.get('/grouped/last', function(req, res, next) {
  try {
    const datetime_subtract = dayjs().subtract(30,'minute');
    const datetime_start = datetime_subtract.format('YYYY-MM-DD HH:mm:ss');
    const datetime_end = dayjs().format('YYYY-MM-DD HH:mm:ss');
    
    if (datetime_start === null || datetime_start === undefined || datetime_end === null || datetime_end === undefined) {
      throw('missing parameter');
    }
    res.json(monitor.getFromDateGroupedByMinutes(datetime_start,datetime_end));
  } catch(err) {
    console.error(`Error while getting monitor `, err.message);
    next(err);
  }
});

/* GET log. */
router.get('/grouped', function(req, res, next) {
  try {
    const datetime_start = dayjs(req.query.datetime_start).format('YYYY-MM-DD HH:mm:ss');
    const datetime_end = dayjs(req.query.datetime_end).format('YYYY-MM-DD HH:mm:ss');

    if (datetime_start === null || datetime_start === undefined || datetime_end === null || datetime_end === undefined) {
      throw('missing parameter');
    }
    res.json(monitor.getFromDateGroupedByMinutes(datetime_start,datetime_end));
  } catch(err) {
    console.error(`Error while getting monitor `, err.message);
    next(err);
  }
});

router.get('/interval', function(req, res, next) {
  try {
    const datetime = dayjs(req.query.datetime).format('YYYY-MM-DD HH:mm:ss');
    const interval = req.query.interval;
    if (datetime === null || datetime === undefined || interval === null || interval === undefined) {
      throw('missing parameter');
    }
    res.json(monitor.getFromInterval(datetime, interval));
  } catch(err) {
    console.error(`Error while getting monitor `, err.message);
    next(err);
  }
});

module.exports = router;
