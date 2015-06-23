console.time("Starting app");

var app = require('express')(),
    server = require('http').Server(app),
    logger = require('./lib/logger');

var port = process.env.PORT || 8080;

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
//require('./controllers/timetable')();


//require('./lib/db').init('127.0.0.1', 27017, function(err) {
require('./lib/db').init('ds039321.mongolab.com', 39321, function(err) {
    if(err) throw err;
    logger.log("Mongoose database connected");
    server.listen(port, function() {
        logger.log("Server listening on http://localhost:" + port);
        console.timeEnd("Starting app");
    });
});
