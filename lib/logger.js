'use strict'

var verbose = false,
    logger;

logger = function(log) {
    verbose = log;
}

logger.log = function(message) {
    if(verbose) {
        console.log("[" + traceCaller().toUpperCase() + "] " + message);
    }
}

logger.logError = function(message) {
    console.log("[" + traceCaller().toUpperCase() + "] ERROR - " + message);
}

module.exports = logger;

function traceCaller(n) {
    if( isNaN(n) || n<0) n=1;
    n+=1;
    var s = (new Error()).stack
        , a=s.indexOf('\n',5);
    while(n--) {
        a=s.indexOf('\n',a+1);
        if( a<0 ) { a=s.lastIndexOf('\n',s.length); break;}
    }
    var b=s.indexOf('\n',a+1); if( b<0 ) b=s.length;
    a=Math.max(s.lastIndexOf(' ',b), s.lastIndexOf('/',b));
    b=s.lastIndexOf(':',b);
    s=s.substring(a+1,b);
    return s;
}
