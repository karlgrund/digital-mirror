var db = require('../lib/database');
var logger = require('../lib/logger');
var classname = "MESSAGES";

/*
 * Get messages
 */
exports.getLatest = function (nbrOfMessages, callback) {
    console.log("[MESSAGES] Getting latest messages");
    db.getMessages(nbrOfMessages, function (err, messageList) {
        if(err) return callback(err, null);
        callback(null, messageList);
    })
};


/*
 * Add message
 */
exports.add = function (req, res, next) {
    logger.log(classname, "Name: " + req.body.name + " with message: " + req.body.message);
    db.addMessage(req.body.name, req.body.message, function (err, data) {
        console.log("DATA:" + data);
        console.log("ERROR: " + err);
        if(err) {
            return res.status(503).json({
                error: true,
                errorMessage: err,
                data: data
            });
        } else {
            res.status(200).json({
                error: false,
                errorMessage: null,
                data: data
            });
        }
        next();
    });
};

