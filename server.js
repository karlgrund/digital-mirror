var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require('fs');
var loop = require('./pollingLoop');
var socketHandler = require('./controllers/socketHandler');



// Global information
var file = __dirname + '/notification_messages.json';

server.listen(8080);

app.get('*', function (req, res) {
    res.sendFile(__dirname + "/" + req.originalUrl);
});

io.sockets.on('connection', function (socket) {
    console.log("New user connected");
    loop.addConnection(socket);

    fs.readFile(file, function(err, data) {
        console.log("Sending information to new user.");
        if (err) throw err;
        //socket.emit('notification', JSON.parse(data));
    });

    fs.watchFile(file, function (curr, prev) {
        fs.readFile(file, function (err, data) {
            console.log("Notification message updated. Sending information.");

            if (err) throw err;
            //socket.emit('notification', JSON.parse(data));
        });
    });

    socket.on('disconnect', function () {
        loop.removeConnection(socket);
    });
});

io.sockets.on('connection', socketHandler.newSocket);
io.sockets.on('disconnect', socketHandler.removeSocket);

console.log('server listening on localhost:8080');