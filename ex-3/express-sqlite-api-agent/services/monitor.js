const db = require('./db');
const config = require('../config');


function getFromDate(date) {
  const data = db.query(`SELECT * FROM log WHERE timestamp >= date(?) AND timestamp < date(?,'+1 days')`, [date, date]);
  return {
    data,
  }
}

function getFromInterval(datetime, interval) {
  const data = db.query(`SELECT * FROM log WHERE timestamp < DATETIME(?) and timestamp >= DATETIME(?,?)`, [datetime, datetime, interval]);
  return {
    data,
  }
}
function getFromDateGroupedByMinutes(datetime_start, datetime_end) {
  const data = db.query(`
  SELECT 
    strftime('%Y-%m-%d %H:%M', l.timestamp) as date_with_hour_minutes,
    avg(l.memory_used) as avg_memory_used,
    avg(l.memory_total) as avg_memorytotal
  FROM 
    log l
  WHERE
    l.timestamp >= DATETIME(?) and
    l.timestamp < DATETIME(?)
  GROUP BY 
    strftime('%Y-%m-%d %H:%M', l.timestamp)
  `, [datetime_start, datetime_end]);
  return {
    data,
  }
}
function validateCreate(log) {
  let messages = [];
  if (!log) {
    messages.push('No object is provided');
  }
  if (!log.uuid) {
    messages.push('Uuid is empty');
  }
  if (!log.memory_total) {
    messages.push('Total memory Info is empty');
  }
  if (!log.memory_used) {
    messages.push('Used memory Info is empty');
  }
  if (!log.host_name) {
    messages.push('Hostname is empty');
  }
  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(logObj) {
  validateCreate(logObj);
  const {uuid, memory_used, memory_total , host_name} = logObj;
  const result = db.run('INSERT INTO log (uuid, memory_used, memory_total, host_name) VALUES (@uuid, @memory_used, @memory_total , @host_name)', {uuid, memory_used, memory_total, host_name});
  let message = 'Error in creating log registry';
  if (result.changes) {
    message = 'Log created successfully';
  }

  return {message};
}

module.exports = {
  getFromDate,
  getFromInterval,
  getFromDateGroupedByMinutes,
  create
}
