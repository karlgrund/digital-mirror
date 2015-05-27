var express = require('express'),
    bodyParser = require('body-parser'),
    messages = require('../models/messages'),
    io = require('../controllers/socketHandler');

module.exports = function(app, server) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.post('/addMessage', messages.add, io.updateAllUsers);


    app.post('/addGrosseryItem', function(req, res) {
        console.log(req.body);
        res.status(200).json({
            error: false,
            errorMessage: null,
            data: req.body
        });
        res.end();
    });
    app.post('/removeGrosseryItem', function(req, res) {
        console.log(req.body);
        res.status(200).json({
            error: false,
            errorMessage: null,
            data: req.body
        });
        res.end();
    });
    app.use(express.static('./public'));
    io.listen(server);
}