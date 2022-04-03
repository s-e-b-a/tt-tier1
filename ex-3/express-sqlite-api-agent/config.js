const env = process.env;

const config = {
  listPerPage: env.LIST_PER_PAGE || 10,
  minDelayToDesconnect: env.MIN_DISCONNECT || 30,
  segFrequencyToSendLog: env.SEG_FREQUENCY_TO_SEND_LOG|| 1
}

module.exports = config;
