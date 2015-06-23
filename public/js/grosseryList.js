/**
* Created by Johan on 15-05-26.
*/
'use strict'

appendToGrosseryList(["1 kg Mjölk", "2 kg Socker", "Mkt Godis"])
//$.get('/grosseryList', );

$("#open-add-grossery").on('click', function (event) {
    event.preventDefault();
    console.log("Wohoo!");
    $("#add-grossery").show("slow");
    $("#open-add-grossery").hide();
});

$("#add-grossery").on('submit', function (event) {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/addGrosseryItem',
        data: $(this).serialize()
    })
        .error(function(err) {
            console.error(err);
        })
        .success(function(res){
            var content = '<a href="#" data-item="' + res.data.grosseryItem + '"><img src="images/delete.png" width="15px"></a><span class="label-grossery-item">' + res.data.grosseryItem + '</span>';
            $('.grossery-list').append($('<li>', { html: content}));
            $("#open-add-grossery").trigger('reset');
        });

    $(this).hide("slow");
    $('#empty-grossery-list').hide();
    $("#open-add-grossery").show("slow");
});

$('.grossery-list').on('click', 'a[data-item]', function(event) {
    event.preventDefault();

    var attr = $(event.currentTarget);
    $.ajax({
        type: 'POST',
        url: '/removeGrosseryItem',
        data: { grosseryItem: $(this).attr('data-item') }
    })
        .error(function(err) {
            console.error(err);
        })
        .success(function(){
            if(attr.parents('ul')[0].childElementCount == 2) $('#empty-grossery-list').show();
            attr.parents('li').remove();
            $("#open-add-grossery").trigger('reset');
        });
});

function appendToGrosseryList(items) {
    var list = [];
    var content, item;
    for(var i in items) {
        item = items[i];
        content = '<a href="#" data-item="' + item + '"><img src="images/delete.png" width="15px"></a><span class="label-grossery-item">' + item + '</span>';
        list.push($('<li>', { html: content }));
    }
    if(list.length == 0) return false;
    $('.grossery-list').append(list);
    $('#empty-grossery-list').hide();
}