/**
* JS code regarding non-canvas elements of the UI.
* Public functions:
* - init(): points the UI to a dataTarget, creates HTTPClient.
* - listData(): sends GET request, populates the uri-select box.
* - getData(): sends GET request with uri-select box, forwards results to dataTarget.
*/
var visualizationUi = window.visualizationUi || {};

/**
* Initializes and configures the UI.
* Input: JS object of configurations.
* Effects: Stores the config object, and creates an HTTPClient.
*/
visualizationUi.init = function(config) {
    this.config = config || { dataTarget : null };
    this._http = new chumbucket.HTTPClient();
}

/**
* This function sends a GET request to retrieve the data reference URIs.
* Effects:
* - Sends GET request "/Visualization/ListData?uri=/"
* - Whatever it gets back is filled in the selectbox.
*/
visualizationUi.listData = function() {
    var e = document.getElementById("search-uri-select");
    visualizationUi._http.get("Visualization/ListData", { "uri" : e.options[e.selectedIndex].value })
        .then(visualizationUi.populateDropDown_, visualizationUi.defaultFailure_);
}

/**
* This function sends a GET request to get the contained data.
* Effects:
* - Sends GET request "/Visualization/GetData?uri=" + selectbox uri
* - Forwards the contained data to the dataTarget.
*/
visualizationUi.getData = function() {
    /*
    * Forward the _resulstuff to the dataTarget.
    */
    var e = document.getElementById("retrieve-uri-select");
    visualizationUi._http.get("Visualization/GetData", { "uri" : e.options[e.selectedIndex].value })
        .then(visualizationUi.forwardData_, visualizationUi.defaultFailure_);
}

/**
* If a GET request fails for whatever reason, we should console log it!
* Input: Some string.
* Effects: Logs the string to the console.
*/
visualizationUi.defaultFailure_ = function(error) {
    console.log(error);
}

/**
* Fills the selectbox.
* Input: JSON object containing field "_result" -> { uri : array of strings }
* Effects: Clears the uri-select options, and fills it with the strings.
*/
visualizationUi.populateDropDown_ = function(data) {
    var mydata = data["_result"];
    var selectBox = document.getElementById("retrieve-uri-select");
    // Clear the uri-select-box
    for (var i = selectBox.options.length - 1 ; i >= 0 ; i--) {
        selectBox.remove(i);
    }
    // Fill the uri-select-box with new stuff!
    for (var i = 0; i < mydata.uris.length; i++) {
        var option = mydata.uris[i];
        selectBox[i] = new Option(option, option);
    }
}

/**
* Sends a JSON object of data to the dataTarget.
* Input: JSON object containing field "_result" -> Object
*/
visualizationUi.forwardData_ = function(data) {
    visualizationUi.config.dataTarget.receiveData(data["_result"]);
}

/**
* Github Pages compatibility functions.
* The following code will not be included in the final project.
*/

/**
* Same as listData, but sends it without the / in the beginning.
* Probably won't be used in the final product, but useful for Github Page demo
*/
visualizationUi.listData2 = function() {
    var e = document.getElementById("search-uri-select");
    visualizationUi._http.get("platform-ui/Visualization/ListData", { "uri" : e.options[e.selectedIndex].value })
        .then(visualizationUi.populateDropDown_, visualizationUi.defaultFailure_);
}

/**
* Same as getData, but sends it without the / in the beginning.
* Probably won't be used in the final product, but useful for Github Page demo
*/
visualizationUi.getData2 = function() {
    /*
    * Forward the _resulstuff to the dataTarget.
    */
    var e = document.getElementById("retrieve-uri-select");
    visualizationUi._http.get("platform-ui/Visualization/GetData", { "uri" : e.options[e.selectedIndex].value })
        .then(visualizationUi.forwardData_, visualizationUi.defaultFailure_);
}
