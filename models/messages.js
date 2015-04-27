var db = require('../lib/database');

exports.get = function (callback) {
    db.getMessages(function (err, data) {
        if (err) return callback(err, null);
        callback(null, data);
    });
};

exports.add = function (req, res, next) {
    db.addMessage(function (err, data) {
        res.json(err ? 503 : 200, {
            error: err ? true : null,
            errorMessage: err ? err : null,
            data: data
        });
    });
};