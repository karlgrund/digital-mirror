'use strict';

var fs = require('fs');

var timeTable = [],
    listOfTasks = [];

module.exports = timeTable;


timeTable.addTimer = function (APIName, callback) {
    fs.readFile('./timetable.json', 'utf-8', function (err, obj) {
        if (err) throw err;

        var obj = JSON.parse(obj);
        if (!obj[APIName]) return callback("API does not exist in timetable.json. Please add it!");

        listOfTasks[listOfTasks.length] = {
            API: APIName,
            timeUntilNextCall: calculateNextCall(obj[APIName]),
            callback: callback
        }
        updateNextTask();
    });
};

function timeIsWithinInterval(lowerLimit, higherLimit) {
    var date = new Date(),
        currentTime = date.getMinutes() + date.getHours() * 60;

    return (currentTime >= lowerLimit && currentTime < higherLimit)
}

function calculateNextCall(API) {
    var date = new Date();

    for (var assignment in API) {
        if (assignment == "default") {
            if (API[assignment]["frequency"])
                return date.getTime() + API[assignment]["frequency"] * 60 * 1000;
            else {
                var updateTime = API[assignment]["updateOnce"].split(":");
                if (updateTime[0] < date.getHours() || (updateTime[1] <= date.getMinutes && updateTime[0] == date.getHours())) {
                    date.setDate(date.getDate() + 1);
                } else date.setDate(date.getDate());

                date.setHours(updateTime[0]);
                date.setMinutes(updateTime[1]);
                return date.getTime();
            }
        } else if (API[assignment]["day"].indexOf(date.getDay()) > -1) {
            var startTime = API[assignment]["start"].split(":"),
                stopTime = API[assignment]["stop"].split(":");
            if (timeIsWithinInterval(startTime[1] + startTime[0] * 60, stopTime[1] + stopTime[0] * 60)) {
                return date.getTime() + API[assignment]["frequency"] * 60 * 1000;
            }
        }
    }
}

function updateNextTask() {
    var date = new Date(),
        lowestTime = Number.MAX_VALUE,
        nextFunction;

    listOfTasks.forEach(function (task) {
        if (task.timeUntilNextCall < lowestTime) {
            lowestTime = task.timeUntilNextCall;
            nextFunction = task;
        }
    });

    listOfTasks.slice(listOfTasks.indexOf(nextFunction), 1);
    setTimeout(function () {
        nextFunction.callback();
        timeTable.addTimer(nextFunction.API, nextFunction.callback);
    }, lowestTime - date.getTime());
}