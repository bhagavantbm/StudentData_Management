$(document).ready(function () {
    $("*").css("background-color", "green");
    $("#name").css("background-color", "red");
    $(".dot").bind("click", function () {
        alert("clicked")
    })
});

