var APIKey = require('../API_keys');

exports.getWodifyAPI = function() {
    if(process.env.wodify) return process.env.wodify;
    return APIKey.wodify;
}

exports.getSLAPI = function() {
    if(process.env.wodify) return process.env.SL;
    return APIKey.SL;
}