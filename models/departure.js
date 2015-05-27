var http = require('http'),
    logger = require('../lib/logger'),
    key = require('../controllers/keys');

exports.getTimetable = function (callback) {
    var body = '';
    date = new Date().toISOString().slice(0, 10);
    logger.log("Asking API for next departure: " + key.getSLAPI());
    http.get("http://api.sl.se/api2/realtimedepartures.json?key=" + key.getSLAPI() + "&siteid=9264&timewindow=60", function (res) {
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            try {
                var data = JSON.parse(body)["ResponseData"]["Metros"];

                var departure = [];
                for (var component in data) {
                    if(data[component]["Destination"] == "Fruängen") {
                        logger.log("Received data for subway: " + data[component]["DisplayTime"]);
                        departure.push({
                            displayTime: data[component]["DisplayTime"]
                        });
                    }
                }
            } catch (e) {
                callback(e.message);
                logger.logError("Got error: " + e.message);
            }
            logger.log("Timetable is fetched and returned: " + JSON.stringify(departure));
            callback(null, departure);
        })
        res.on('error', function (e) {
            callback(e.message);
            logger.logError("Got error: " + e.message);
        });
    });
};