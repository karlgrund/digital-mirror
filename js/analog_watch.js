/**
 * Created by Johan on 2015-04-25.
 */

function draw_clock(){
    canvas = Raphael("clock_id",200, 200);
    var clock = canvas.circle(100,100,95);
    clock.attr({"fill":"#f5f5f5","stroke":"#444444","stroke-width":"5"});
    var hour_sign;
    for(i=0;i<12;i++){
        var start_x = 100+Math.round(80*Math.cos(30*i*Math.PI/180));
        var start_y = 100+Math.round(80*Math.sin(30*i*Math.PI/180));
        var end_x = 100+Math.round(90*Math.cos(30*i*Math.PI/180));
        var end_y = 100+Math.round(90*Math.sin(30*i*Math.PI/180));
        hour_sign = canvas.path("M"+start_x+" "+start_y+"L"+end_x+" "+end_y);
    }
    hour_hand = canvas.path("M100 100L100 50");
    hour_hand.attr({stroke: "#444444", "stroke-width": 6});
    minute_hand = canvas.path("M100 100L100 40");
    minute_hand.attr({stroke: "#444444", "stroke-width": 4});
    second_hand = canvas.path("M100 110L100 25");
    second_hand.attr({stroke: "#444444", "stroke-width": 2});
    var pin = canvas.circle(100, 100, 5);
    pin.attr("fill", "#000000");
    update_clock();
    setInterval("update_clock()",1000);
}

function update_clock(){
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    hour_hand.rotate(30*hours+(minutes/2.5), 100, 100);
    minute_hand.rotate(6*minutes, 100, 100);
    second_hand.rotate(6*seconds, 100, 100);

}