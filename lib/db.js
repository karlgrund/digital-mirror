'use strict'


var mongodb = require('mongodb');

module.exports.init = function (url, port, callback) {
    var server = new mongodb.Server(url, port);
    new mongodb.Db('digital-mirror', server).open(function (error, db) {

        module.exports.client = db;
        module.exports.messages = db.collection("messages");
        module.exports.grosserylist = db.collection("grosserylist");
        callback(error);
    });
};