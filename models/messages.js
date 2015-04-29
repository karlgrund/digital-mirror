var db = require('../lib/database');

/*
 * Get messages
 */
exports.getLatest = function (callback) {
    db.getMessages(function (err, messageList) {
        if(err) return callback(err, null);
        callback(null, messageList);
    })
};


/*
 * Add message
 */
exports.add = function (req, res, next) {
    console.log(req.body);
    db.addMessage(req.body, function (err, data) {
        if(err) {
            return res.status(503).json({
                error: true,
                errorMessage: err,
                data: data
            });
        }
        res.status(200).json({
            error: false,
            errorMessage: null,
            data: data
        });
    });
    next();
};

