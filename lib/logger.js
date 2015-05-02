var verbose = false;

exports.log = function(sender, message) {
    if(verbose) {
        console.log("[" + sender.toUpperCase() + "] " + message);
    }
}

exports.logError = function(sender, message) {
    console.log("[" + sender.toUpperCase() + "] ERROR - " + message);
}

exports.setLogging = function(log) {
    verbose = log;
}
