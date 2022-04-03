const monitor = require('./services/monitor');
const config = require('./config');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const { v4: uuidv4 } = require('uuid');
const os = require("os");

let trigger = null;

eventEmitter.on('addMetric', () => {
    monitor.create({
        uuid: uuidv4().toString(),
        host_name: os.hostname(),
        memory_used: os.totalmem() - os.freemem(),
        memory_total : os.totalmem()
    });
});


eventEmitter.on('disconnect', () => {
    clearInterval(trigger);
    console.log('disconnect');
});

eventEmitter.on('connect', () => {
    console.log('connected');
    trigger = setInterval(() => {
        eventEmitter.emit('addMetric');
    }, config.segFrequencyToSendLog * 1000);
    setTimeout(() => {
        eventEmitter.emit('disconnect');
    }, config.minDelayToDesconnect * 60 * 1000);
});

eventEmitter.emit('connect');


