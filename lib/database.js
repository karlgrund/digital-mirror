var mysql = require('mysql');
var dateFormatter = require('dateformat');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'nodejs',
    port: '3306'
});

connection.connect(function (err) {
    if (!err) {
        console.log("[DATABASE] Database is connected ... \n\n");
    } else {
        console.log("[DATABASE] Error connecting database ... \n\n");
    }
});


exports.getMessages = function (nbrOfMessages, callback) {
    console.log("[DATABASE] Fetching messages from database: " + nbrOfMessages);
    connection.query('SELECT * FROM messages where ID > ((select max(ID) from messages) - 3)', function (err, latestMessages) {
        if (err) return callback(err, null);
        console.log("error: " + err);
        callback(null, latestMessages);
    });
};

exports.addMessage = function (data, callback) {
    console.log("[DATABASE] Adding new message to database: " + data[0].message);
    var date = new dateFormatter(new Date(), "yyyy-mm-dd h:MM:ss");
    var tmp = 'INSERT INTO messages (user, date, message) values ("Johan", ' + '20150428' + ', "' + data[0].message + '")';
    connection.query(tmp, function (err, result) {
        if (err) return callback(500, err);
        callback(200, result);
    });
}