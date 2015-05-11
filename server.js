var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('./controllers/socketHandler');

var bodyParser = require('body-parser');
var messages = require('./models/messages');
var logger = require('./lib/logger')
var timetable = require('./lib/timetable');

io.listen(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

process.argv.forEach(function(val) {
    switch(val) {
        case "--verbose":
        case "-v":
            logger.setLogging(true);
            break;
        case "--help":
        case "-h":
            console.log("Use -v to enable logging.")
            process.exit(1);
            break;
    }
});

app.post('/addMessage', messages.add, io.updateAllUsers);

server.listen(8080, function() {
    timetable.addTimer("SL", function(err) {
        if(err) console.log("ERROR: " + err);
        console.log("Now we should send some data to clients");
    });
    console.log('[SERVER] Server listening on localhost:8080');
});