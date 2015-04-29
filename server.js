var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
var messages = require('./models/messages');
var socketHandler = require('./controllers/socketHandler');

app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/messages', function(req, res) {
    response.json();
})
app.post('*', messages.add, socketHandler.updateSockets);

io.sockets.on('connection', socketHandler.newSocket);
io.sockets.on('disconnect', socketHandler.removeSocket);

server.listen(8080, function() {
    console.log('[SERVER] server listening on localhost:8080');
});