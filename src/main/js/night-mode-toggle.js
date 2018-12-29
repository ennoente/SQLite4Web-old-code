let nightMode = false;
let body$ = $("body");

$(document).ready(function() {
    $(this).keydown(function(e) {
        if (e.keyCode === 78) {     // N
            if (!nightMode)
                body$.css("background-color", "#323232");
            else
                body$.css("background-color", "#FFFFFF");

            nightMode = !nightMode;
        }
    });
});