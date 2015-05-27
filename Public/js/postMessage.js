/**
 * Created by Johan on 15-05-26.
 */
'use strict'
$(function () {
    $("#post-message").on('submit', function (event) {
        event.preventDefault();
        console.log($(this).serialize());
        console.log(JSON.stringify($(this)));
        $.ajax({
            type: 'POST',
            url: '/addMessage',
            data: $(this).serialize()
        })
        .error(function () {
            console.log("Teest");
            $('.alert').show();
        })
        .success(function (res) {
            $("#post-message").trigger("reset");
        });
    });
});