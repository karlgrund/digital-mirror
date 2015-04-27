var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'nodejs',
    port: '3306'
});
var POLLING_INTERVAL = 3000;
var connectionsArray = [];
var pollingTimer;


connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
});

exports.pollingLoop = function () {

    console.log("Doing polling!");
    var query = connection.query('SELECT * FROM messages'),
        allMessages= []; // this array will contain the result of our db query

    console.log("Setting up QUERY");
    // set up the query listeners
    query
        .on('error', function (err) {
            // Handle error, and 'end' event will be emitted after this as well
            console.log(err);
            return err;

        })
        .on('result', function (message) {
            // it fills our array looping on each user row inside the db
            allMessages.push(message);
        })
        .on('end', function () {

            if (connectionsArray.length) {
                console.log("Here are all the messages. By the way, sum of sockets: " + connectionsArray.length);
                console.log(allMessages);
                connectionsArray.forEach(function( tmpSocket ){
                    tmpSocket.emit('notification', allMessages);
                });
                setTimeout(exports.pollingLoop, POLLING_INTERVAL);
            }
        });

};

exports.addConnection = function(socket) {
    console.log("New user connected. Adding socket to socket.io");
    connectionsArray.push(socket);
    if(connectionsArray.length == 1) {
        this.pollingLoop();
    }
};

exports.removeConnection = function(socket) {
    console.log("User disconnected and removed.");
    connectionsArray.splice(connectionsArray.indexOf(socket), 1);
};