var http = require('http');
var logger = require('../lib/logger');
var key = require('../controllers/keys');

var classname = "WODIFY";

exports.getWOD = function (callback) {
    var body = '';
    date = new Date().toISOString().slice(0, 10);
    logger.log(classname, "Asking API for WOD for date: " + date);
    http.get("http://app.wodify.com/API/WODs_v1.aspx?apikey=" + key.getWodifyAPI() + "&location=CrossFit%20Medis&date=" + date + "&program=crossfit&type=json", function (res) {

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var fbResponse = body.replace("\r\n", "<br/>");
            try {
                var data = JSON.parse(fbResponse)["RecordList"]["APIWod"]["Components"]["Component"];
                var WOD = [];
                for (var component in data) {
                    WOD.push({
                        name: data[component]["Name"],
                        comment: data[component]["Comments"],
                        nbrOfReps: data[component]["RepScheme"],
                        typeOfScheme: data[component]["PerformanceResultTypeName"],
                        description: data[component]["Description"]
                    });
                }
            } catch (err) {
                callback(err, null);
            }
            logger.log(classname, "WOD is fetched and returned");
            callback(null, WOD);
        })

        res.on('error', function (e) {
            console.log("Got error: ", e);
            callback(e.message, null);
        });
    }).on('error', function (e) {
        callback(e.message, null);
        console.log("Got error: " + e.message);
    });
};