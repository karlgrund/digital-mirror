var express = require('express');
var app = express();
var server = require('http').Server(app);

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));


app.post('/addMessage', function(response, request) {

    console.log("[NEW POST] " + request);
});


server.listen(8080, function() {
    console.log('[SERVER] server listening on localhost:8080');
});