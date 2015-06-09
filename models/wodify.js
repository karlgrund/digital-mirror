var http = require('http'),
    logger = require('../lib/logger'),
    key = require('../controllers/keys');

exports.getWOD = function (callback) {
    var body = '',
        date = new Date().toISOString().slice(0, 10),
        url = "http://app.wodify.com/API/WODs_v1.aspx?apikey=" + key.getWodifyAPI() + "&location=CrossFit%20Medis&date=" + date + "&program=crossfit&type=json";

    logger.log("Asking API for WOD for date: " + date);
    http.get(url, function (res) {

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            console.log(body);
            if(JSON.parse(body).hasOwnProperty('APIError')) {
                callback(JSON.parse(body)["APIError"]["ResponseCode"], JSON.parse(body)["APIError"]["ErrorMessage"])
            } else {
                var fbResponse = body.replace("\r\n", "<br/>");
                var data = JSON.parse(fbResponse)["RecordList"]["APIWod"]["FormattedWOD"];
                logger.log("Workout fetched");
                callback(null, data);
            }
        });

        res.on('error', function (e) {
            callback(e.message);
            logger.logError("Got error: " + e.message);
        });
    });
};