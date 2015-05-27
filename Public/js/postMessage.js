/**
 * Created by Johan on 15-05-26.
 */
'use strict'
$("#post-message").on('submit', function (event) {
    event.preventDefault();
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