var oClockAnalog = {
    dtDate: new Date(),
    iTimerAnimate: setInterval("oClockAnalog.fAnimate()", 20),
    iTimerUpdate: setInterval("oClockAnalog.fUpdate()", 1000),

    fGetHour: function () {
        return Math.round((this.dtDate.getHours() * 60 + this.dtDate.getMinutes())/2);
    },
    fGetMinute: function () {
        return Math.round(this.dtDate.getMinutes() * 6);
    },
    fGetSeconds: function () {
        return Math.round(this.dtDate.getSeconds() * 6);
    },

    fRotate: function (sID, iDeg) {
        var sCSS = ("rotate(" + iDeg + "deg)");
        $("#" + sID).css({'transform': sCSS});
    },

    fUpdate: function () {
        this.dtDate = new Date();

        this.fRotate("analoghour", this.fGetHour());
        this.fRotate("analogminute", this.fGetMinute());
        this.fRotate("analogsecond", this.fGetSeconds());
    }
};

$(document).ready(function () {
    oClockAnalog.fUpdate();
});