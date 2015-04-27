var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'nodejs',
    port: '3306'
});


exports.getMessages = function (callback) {
    var query = connection.query('SELECT * FROM messages');
    var allMessages = [];

    query
        .on('error', function (err) {
            return callback(err, null);
        })
        .on('result', function (message) {
            allMessages.push(message);
        })
        .on('end', function () {
            return callback(null, allMessages);
        });
};

exports.addMessage = function (callback) {
    // Add message to database :)
}