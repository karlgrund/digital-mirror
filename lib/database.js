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

/*
 *
 */

exports.getMessages = function (callback) {
    connection.query('SELECT * FROM messages where ID > ((select max(ID) from messages) - 3)', function (err, latestMessages) {
        if(err) return callback(err, null);
        callback(null, JSON.stringify(latestMessages));
    });
};

exports.addMessage = function (data, callback) {
    trimDatabase(function () {
        console.log("[DATABASE] Adding new message to database: " + data[0].message);
        var date = new dateFormatter(new Date(), "yyyy-mm-dd h:MM:ss");
        var tmp = 'INSERT INTO messages (user, date, message) values ("Johan", ' + '20150428' + ', "' + data[0].message + '")';
        connection.query(tmp, function (err, result) {
            if (err) return callback(500, err);
            callback(200, result);
        });
    });
}

/*
 * Trims down the database to 3 items
 */
var trimDatabase = function (callback) {
    console.log("First yeay!");
    connection.query('SELECT COUNT(1) as count FROM messages', function (err, result) {
        if (err) return console.log("Could not delete");
        var count = parseInt(result[0].count);
        console.log("Item id db: " + result[0].count);
        if (count > 3) {
            console.log("Remove items!");
            connection.query('select ID from messages order by ID ASC limit ' + (count - 3), function (err, result) {
                console.log(result[0].ID);
                result.forEach(function (item) {
                    var tmp = 'DELETE from messages where ID=' + item.ID;
                    console.log(tmp);
                    connection.query('DELETE from messages where ID=' + item.ID);
                })
            });
        }
        ;
    });
    console.log("NOO");
    callback();
}