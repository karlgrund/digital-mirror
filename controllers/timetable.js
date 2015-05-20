var timetable = require('../lib/timetable');

module.exports = function() {

    timetable.addTimer("SL", function(err) {
        if(err) console.log("ERROR: " + err);
    });

    timetable.addTimer("wodify", function(err) {
        if(err) console.log("ERROR: " + err);
    });
}