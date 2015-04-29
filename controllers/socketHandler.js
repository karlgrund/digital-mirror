var messages = require('../models/messages');
var io = require('socket.io')(80);

io.on('connection', function (socket) {

    // On every connected socket.
    messages.getLatest(function (err, messageList) {
        if (!err) {
            messageList.forEach(function (message) {
                io.emit('messageCenter', message);
            });
        }
    });
});


// REMOVE CODE BELOW!

exports.newSocket = function (socket) {
    console.log("[SOCKETHANDLER] New client added...!");
    connectedSockets.push(socket);
};

/*
 * Removes socket that disconnects
 */
exports.removeSocket = function (socket) {
    var index = connectedSockets.indexOf(socket);
    if (index > -1) {
        connectedSockets.splice(connectedSockets, 1);
    }
};

/*
 * Update all sockets with new information
 */
exports.updateSockets = function () {
    console.log("Updating sockets!");
    connectedSockets.forEach(function (socket) {
        messages.get(function (err, data) {
            if (err) return console.log(err);
            socket.emit('message', data);
        })
    })
}