let originalText = "";
let alreadySelectedCell = null;

/**
 * Styles and adds functionality to the table.
 *
 * TODO: DOKU SCHREIBEN
 */
function addCellManipulation() {
    let td$ = $("#table:has(td)");

    td$.mouseover(function () {
        $(this).css("cursor", "pointer");
    });

    td$.dblclick(function (e) {
        // Remove the current input field, if existing
        let currentInput = $("#input");
        currentInput.closest("td").text(currentInput.val());
        currentInput.remove();

        // For clarity
        let newInput = $("#input");

        // If another cell was already selected set its text to its original cell
        // since its change was not submitted
        if (alreadySelectedCell != null)
            alreadySelectedCell.text(originalText);

        let clickedCell = $(e.target).closest("td");
        alreadySelectedCell = clickedCell;
        originalText = clickedCell.text();
        console.log(originalText);

        let input = $('<input id="input" type="text" />');

        setFocusOnInput(newInput, function() {
            newInput.val(originalText);
            newInput.focus();
        });

        input.bind("enterKey", function(e) {
            //$("#input").closest("td").text($("#input").val());
            alreadySelectedCell.text(currentInput.val());
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


let setFocusOnInput = function(selector, callback) {
    if (document.querySelector("#input") != null) {
        callback();
    } else {
        setTimeout(function() {
            setFocusOnInput(selector, callback);
        }, 8);
    }
};


function updateCell() {
    let request = new XMLHttpRequest();

    let url = "http://localhost:8080/update/cell";

    if (primaryKey != null) {
        url += "?primaryKey=" + primaryKey;
    }

    request.open("POST", "http://localhost:8080/upload/cell");

    request.onload = function() {
        console.log("Success! :)");
    };
}










