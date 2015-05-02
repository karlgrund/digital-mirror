var mysql = require('mysql');
var dateFormatter = require('dateformat');
var logger = require('../lib/logger');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'nodejs',
    port: '3306'
});

var classname = 'DATABASE';

connection.connect(function (err) {
    if (!err) {
        console.log("[DATABASE] Database is connected...");
    } else {
        console.log("[DATABASE] Error connecting database...");
    }
});

exports.getMessages = function (nbrOfMessages, callback) {
    console.log("[DATABASE] Fetching messages from database: " + nbrOfMessages);

    // Need to add nbrOfMessages to query.
    connection.query('SELECT * FROM messages where ID > ((select max(ID) from messages) - 3)', function (err, latestMessages) {
        if (err) return callback(err, null);
        callback(null, latestMessages);
    });
};

exports.addMessage = function (user, message, callback) {
    logger.log(classname, "Adding new message to database: " + message + " by user: " + user);
    var date = new dateFormatter(new Date(), "yyyy-mm-dd h:MM:ss");

    connection.query('INSERT INTO messages (user, date, message) values ("' + user + '", "' + date + '", "' + message + '")'
        , function (err, result) { return callback(err, result) });
};