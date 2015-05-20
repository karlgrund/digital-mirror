console.time("Starting app");

var app = require('express')(),
    server = require('http').Server(app),
    logger = require('./lib/logger');

var env = process.env.NODE_ENV = process.env.NODE_UNIQUE_ID || 'development';

process.argv.forEach(function(val) {
    switch(val) {
        case "--verbose":
        case "-v":
            logger.setLogging(true);
            break;
        default:
    }
});

require('./config/express')(app, server);
require('./controllers/timetable')();

server.listen(8080, function() {
    console.log('[SERVER] Server listening on localhost:8080');
    console.timeEnd("Starting app");
});