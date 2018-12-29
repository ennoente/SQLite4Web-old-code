// Binds the @uploadFile function to file input's onChange-Event
$(document).ready(function() {
    $("#hiddenInput").on("change", uploadFile);
});

/**
 * Uploads the selected file to the REST API via AJAX's XMLHttpRequest.
 * @param file The file to be sent to the server
 */
function uploadFile(file) {
    // Create FormData object carrying the file
    let formData = new FormData();
    formData.append("file", ($("#hiddenInput"))[0].files[0]);

    let request = new XMLHttpRequest();

    // Success callback
    request.onload = function() {
        // Store the JSON response into variable
        let jsonResponse = JSON.parse(this.responseText);
        console.log(jsonResponse);

        // Parse response JSON
        let metadata = jsonResponse["metadata"];
        let data = jsonResponse["data"];
        let dataLength = jsonResponse["data"].length;
        let table$ = $("#table");

        // Logging
        console.log("metadata: ");
        console.log(metadata);
        console.log("Data length: " + dataLength);

        constructTableFromResponse(table$, metadata, data, dataLength);
        styleTable();
    };

    // Error callback
    request.onerror = function() {
        alert("Oh neeeej!");
    };

    // Open connection and send
    request.open("POST", "http://localhost:8080/upload");
    request.send(formData);
}

function constructTableFromResponse(table$, metadata, data, dataLength) {
    // Construct table header row
    let headerRow$ = $('<tr/>');
    for (let i = 0; i < metadata.length; i++) {
        headerRow$.append($('<th/>').html(metadata[i]));
    }
    table$.append(headerRow$);

    // Construct table data rows
    for (let i = 0; i < dataLength; i++) {
        let row$ = $('<tr/>');
        let currentRow = data[i];
        for (let j = 0; j < currentRow.length; j++) {
            row$.append($('<td/>').html(currentRow[j]));
        }
        table$.append(row$);
    }
}