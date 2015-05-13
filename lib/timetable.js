var fs = require('fs');
var timeTable = [];
var listOfTasks = [];
var obj;

module.exports = timeTable;


timeTable.addTimer = function (APIName, callback) {
    obj = JSON.parse(fs.readFileSync('./timetable.json', 'utf-8'));
    if (!obj[APIName]) return callback("API does not exist in timetable.json. Please add it!");
    listOfTasks[listOfTasks.length] = {
        API: APIName,
        timeUntilNextCall: calculateNextCall(obj[APIName]),
        callback: callback
    }
    updateNextTask();
};

var calculateNextCall = function (API) {
    var date = new Date();

    for (var assignment in API) {
        if (assignment == "default") {
            if(API[assignment]["frequency"]) return date.getTime() + API[assignment]["frequency"] * 60 * 1000;
            else {
                var updateTime = API[assignment]["updateOnce"].split(":");
                if(updateTime[0] < date.getHours() || (updateTime[1] <= date.getMinutes && updateTime[0] == date.getHours())) {
                    date.setDate(date.getDate()+1);
                    date.setHours(updateTime[0]);
                    date.setMinutes(updateTime[1]);
                    return date.getTime();
                }
            }
        } else if (API[assignment]["day"].indexOf(date.getDay()) > -1) {
            var startTime = API[assignment]["start"].split(":");
            var stopTime = API[assignment]["stop"].split(":");

            if (startTime[0] < date.getHours() || (startTime[1] <= date.getMinutes() && startTime[0] == date.getHours())) {
                if (stopTime[0] > date.getHours() || (stopTime[1] >= date.getMinutes() && stopTime[0] == date.getHours())) {
                    var timeLeft =  date.getTime() + API[assignment]["frequency"] * 60 * 1000;
                    return timeLeft;
                }
            }
        }
    }
}

var updateNextTask = function () {
    var lowestTime = Number.MAX_VALUE;
    var nextFunction = null;
    listOfTasks.forEach(function (task) {
        if (task.timeUntilNextCall < lowestTime) {
            lowestTime = task.timeUntilNextCall;
            nextFunction = task;
        }
    });
    listOfTasks.pop(nextFunction);
    var date = new Date();
    setTimeout(function() {
        nextFunction.callback();
        timeTable.addTimer(nextFunction.API, nextFunction.callback);
    }, lowestTime - date.getTime());
}