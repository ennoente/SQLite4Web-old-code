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

        // ...
    };

    // Error callback
    request.onerror = function() {
        alert("Oh neeeej!");
    };

    // Open connection and send
    request.open("POST", "http://localhost:8080/upload");
    request.send(formData);
}