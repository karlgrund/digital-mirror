/**
 * Created by Johan on 15-05-27.
 */
var socket = io.connect();
socket.on('messageCenter', function (data) {
    $('#notification_message').empty();
    console.log("[Message Center] Recieved new data. " + new Date().toDateString());
    for (var obj in data) {
        var message = data[obj].Message;
        $('#notification_message').append($('<li>', { html: message}));
    }
});

socket.on('todaysWOD', function(data) {
    console.log("[WOD] Recieved new data. " + new Date().toDateString());
    $('#WOD').html(data);
});

socket.on('departures', function(data) {
    var timetable = "Nästa avgång: ";
    for(var i=0; i<data.length; i++) {
        if(data[0] == "Nu") timetable += "0 min";
        else if(i===0) timetable += data[i].displayTime;
        else if(i===2) timetable += " (" + data[i].displayTime + ")";
    }
    console.log("[Departures] Recieved new data. " + new Date().toDateString());
    $('#subway').text(timetable);
});

socket.on('reload', function() {
    console.log("[RELOAD] Page is reloaded :)");
    location.reload();
})