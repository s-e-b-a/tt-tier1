const db = require('./db');
const config = require('../config');


function getFromDate(date) {
  const data = db.query(`SELECT * FROM log WHERE timestamp >= date(?) AND timestamp < date(?,'+1 days')`, [date, date]);
  return {
    data,
  }
}

function getFromInterval(interval) {
  const data = db.query(`SELECT * FROM log WHERE timestamp >= DATETIME(CURRENT_TIMESTAMP,?)`, interval);
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
  if (!log.memory_info) {
    messages.push('Memory Info is empty');
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
  const {uuid, memory_info, host_name} = logObj;
  console.log(logObj);
  const result = db.run('INSERT INTO log (uuid, memory_info, host_name) VALUES (@uuid, @memory_info, @host_name)', {uuid, memory_info, host_name});
  let message = 'Error in creating log registry';
  if (result.changes) {
    message = 'Log created successfully';
  }

  return {message};
}

module.exports = {
  getFromDate,
  getFromInterval,
  create
}
