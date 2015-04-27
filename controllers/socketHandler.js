

var messages = require('../models/messages');
var connectedSockets = [];

/*
 * Adds new socket to list of connected sockets
 */
exports.newSocket = function(socket) {
    connectedSockets.add(socket);
    messages.get(function(err, data) {
        if (err) console.log(err);
        socket.emit(data);
    });
};

/*
 * Removes socket that disconnects
 */
exports.removeSocket = function(socket) {
    var index = connectedSockets.indexOf(socket);
    if (index > -1) {
        connectedSockets.splice(connectedSockets,1);
    }
};