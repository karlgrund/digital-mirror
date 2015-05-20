var express = require('express'),
    bodyParser = require('body-parser'),
    messages = require('../models/messages'),
    io = require('../controllers/socketHandler');

module.exports = function(app, server) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.post('/addMessage', messages.add, io.updateAllUsers);
    app.use(express.static('./public'));
    io.listen(server);
}