var mongodb = require('../lib/db'),
    logger = require('../lib/logger');

/*
 * Get messages
 */
exports.getLatest = function (nbrOfMessages, callback) {

    mongodb.messages.find({}).limit(3).sort({_id:-1}).toArray(function(err, doc) {
        logger.log("Recieved messages from Mongo DB");
        if (err) return callback(err, null);
        callback(null, doc);
    });
};

/*
 * Add message
 */
exports.add = function (req, res, next) {
    logger.log("Name: " + req.body.name + " with message: " + req.body.message);
    mongodb.messages.insert({ Name: req.body.name, Message: req.body.message }, function(err, result) {
        if (err) {
            return res.status(503).json({
                error: true,
                errorMessage: err,
                data: result
            });
        } else {
            res.status(200).json({
                error: false,
                errorMessage: null,
                data: result
            });
        }
        next();
    });
};

