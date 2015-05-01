var messages = require('../models/messages');
var io = require('socket.io')(8000);

io.on('connection', function (socket) {

    /*
     * Send 3 latest messages to client.
     */
    messages.getLatest(3, function (err, messageList) {
        console.log("[SOCKETHANDLER] Sending 3 latest messages");
        if (err) {
            console.log("[SOCKETHANDLER] ERROR: " + err);
            return err;
        } else {
            console.log("[SOCKETHANDLER] Recieved messages with size: " + messageList.length);
            socket.emit('messageCenter', messageList);
        }
    });
});


/*
 * Update all sockets with new information
 */
exports.updateSockets = function () {
    console.log("[SOCKETHANDLER] Updating sockets with latest!");
    messages.getLatest(function (err, data) {
        if (err) return console.log(err);
        io.sockets.emit('message', data);
    });
};