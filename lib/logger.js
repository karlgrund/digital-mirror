var verbose = false;

exports.log = function(sender, message) {
    if(verbose) {
        console.log("[" + sender.toUpperCase() + "] " + message);
    }

}

exports.setLogging = function(log) {
    verbose = log;
}
