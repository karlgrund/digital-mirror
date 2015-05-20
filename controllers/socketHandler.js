var messages = require('../models/messages'),
    socket = require('socket.io'),
    logger = require('../lib/logger'),
    wodify = require('../models/wodify'),
    timetable = require('../models/departure');

var io;

var classname = "SOCKETHANDLER";

module.exports.listen = function (app) {
    io = socket.listen(app);

    io.on('connection', function (socket) {
        console.log("[SOCKETHANDLER] Got a new client");

        /*
         * Send 3 latest messages to client.
         */
        messages.getLatest(3, function (err, messageList) {
            logger.log(classname, "Sending messages to new client");
            if (err) return logger.logError(classname, "Retrieving from database with err: " + err);
            else {
                socket.emit('messageCenter', messageList);
            }
        });

        /*
         * Update client with todays WOD
         */
        wodify.getWOD(function (err, WOD) {
            logger.log(classname, "Sending todays WOD to client");
            if (err) return err;
            else {
                socket.emit('todaysWOD', WOD);
            }
        });

        /*
         * Update client with next departure time
         */
        timetable.getTimetable(function (err, departures) {
            logger.log(classname, "Sending next departures from Midsommarkransen to client");
            if (err) return err;
            else {
                socket.emit('departures', departures);
            }
        });
    });
};

exports.updateAllUsers = function (reciever) {
    logger.log(classname, "Uppdating all sockets with latest messages");
    messages.getLatest(3, function (err, messageList) {
        console.log("[SOCKETHANDLER] Sending 3 latest messages");
        if (err) {
            return err;
        } else {
            io.sockets.emit('messageCenter', messageList)
        }
    });
};