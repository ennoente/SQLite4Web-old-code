let originalText = "";
let alreadySelectedCell = null;

/**
 * Styles and adds functionality to the table.
 *
 * TODO: DOKU SCHREIBEN
 */
function styleTable() {
    let td$ = $("#table:has(td)");

    td$.mouseover(function () {
        $(this).css("cursor", "pointer");
    });

    td$.dblclick(function (e) {
        let currentInput = $("#input");
        currentInput.closest("td").text(currentInput.val());
        currentInput.remove();

        if (alreadySelectedCell != null)
            alreadySelectedCell.text(originalText);

        let clickedCell = $(e.target).closest("td");

        alreadySelectedCell = clickedCell;

        originalText = clickedCell.text();
        console.log(originalText);

        let input = $('<input id="input" type="text" />');

        let setFocusOnInput = function(selector, callback) {
            if (document.querySelector("#input") != null) {
                callback();
            } else {
                setTimeout(function() {
                    setFocusOnInput(selector, callback);
                }, 8);
            }
        };

        setFocusOnInput($("#input"), function() {
            $("#input").val(originalText);
            $("#input").focus();
            $("#input").css('width', '90%');
        });

        input.bind("enterKey", function(e) {
            $("#input").closest("td").text($("#input").val());
            alreadySelectedCell = null;
        });

        input.bind("escapeKey", function(e) {
            removeInput();
        });

        input.keydown(function(e) {
            switch (e.keyCode) {
                case 13:
                    $(this).trigger("enterKey");
                    break;
                case 27:
                    $(this).trigger("escapeKey");
            }
        });

        clickedCell.html(input);
    });
}

/**
 * Removes the input field and restores the old value of the cell.
 */
function removeInput() {
    let input$ = $("#input");
    let closestCell =input$.closest("td");
    input$.remove();
    closestCell.text("" + originalText);
}

