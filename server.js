console.time("Starting app");

var app = require('express')(),
    server = require('http').Server(app),
    logger = require('./lib/logger');

var PORT = 8080;
process.argv.forEach(function(val) {
    switch(val) {
        case "--verbose":
        case "-v":
            logger(true);
            break;
        default:
    }
});


require('./config/express')(app, server);
require('./controllers/timetable')();
require('./lib/db').init('127.0.0.1', 27017, function(err) {
    if(err) throw err;
    logger.log("Mongoose database connected");
});

server.listen(PORT, function() {
    logger.log("Server listening on http://localhost:" + PORT);
    console.timeEnd("Starting app");
});