var http = require('http'),
    logger = require('../lib/logger'),
    key = require('../controllers/keys');

var classname = "DEPARTURE";

exports.getTimetable = function (callback) {
    var body = '';
    date = new Date().toISOString().slice(0, 10);
    logger.log(classname, "Asking API for next departure: " + key.getSLAPI());
    http.get("http://api.sl.se/api2/realtimedepartures.json?key=" + key.getSLAPI() + "&siteid=9264&timewindow=60", function (res) {
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            try {
                var data = JSON.parse(body)["ResponseData"]["Metros"];
                console.log("DATA: " + JSON.stringify(body));
                var departure = [];
                for (var component in data) {
                    console.log("THIS: " + JSON.stringify(data[component]));
                    if(data[component]["Destination"] == "Fruängen") {
                        departure.push({
                            displayTime: data[component]["DisplayTime"]
                        });
                    }
                }
            } catch (e) {
                callback(e.message);
                console.log("Got error: " + e.message);
            }
            logger.log(classname, "Timetable is fetched and returned: " + JSON.stringify(departure));
            callback(null, departure);
        })
        res.on('error', function (e) {
            callback(e.message);
            console.log("Got error: " + e.message);
        });
    });
};