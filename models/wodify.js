var http = require('http'),
    logger = require('../lib/logger'),
    key = require('../controllers/keys');

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
                    if(data[component]["Name"] != null) {
                        WOD.push({
                            name: data[component]["Name"],
                            comment: data[component]["Comments"],
                            nbrOfReps: data[component]["RepScheme"],
                            typeOfScheme: data[component]["PerformanceResultTypeName"],
                            description: data[component]["Description"]
                        });
                    }
                }
            } catch (err) {
                callback(err);
                console.log("Got error: " + e.message);
            }
            console.log(JSON.stringify(WOD));
            callback(null, WOD);
        })

        res.on('error', function (e) {
            callback(e.message);
            console.log("Got error: " + e.message);
        });
    });
};