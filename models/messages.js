var db = require('../lib/database');

exports.get = function (callback) {
    db.get(function (err, data) {
        if (err) return callback(err, null);
        callback(null, data);
    });
}