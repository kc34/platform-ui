/**
 * JS code for the non-canvas elements.
 */
var httpsender = window.httpsender || {};

/**
 * Just loads in the configurations (currently only the dataTarget);
 */
httpsender.init = function(config) {
  this.config = config;
  this._http = new chumbucket.HTTPClient();
}

/**
 * Sends the get request: GET /ListData?uri=/
 */
httpsender.listData = function() {
  httpsender._http.get("Visualization/ListData").then(httpsender.populateDropDown_, function(fuck) {console.log(fuck)});
}

/**
 * Sends the get request: GET /GetData?uri= ...
 */
httpsender.getData = function() {
  var successFunction = function(data) {
    console.log(data);
    httpsender.forwardData_(data["_result"]);
  }
  var e = document.getElementById("uri-select");
  httpsender._http.get("Visualization/GetData", { "uri" : e.options[e.selectedIndex].value })
    .then(successFunction, function(fuck) {console.log(fuck)});
}

/**
 * Fills in the dropdown menu from a JSON object of { uris: [..., ..., ...,] }
 */
httpsender.populateDropDown_ = function(data) {
  var mydata = data["_result"];
  removeOptions(document.getElementById("uri-select"));
  for (var i = 0; i < mydata.uris.length; i++) {
    var option = mydata.uris[i];
    document.getElementById("uri-select")[i] = new Option(option, option);
  }
}

/**
 * Sends a JSON object to the dataTarget (specified in configs)
 * Just a proof of concept currently.
 */
httpsender.forwardData_ = function(data) {
  httpsender.config.dataTarget.receiveData(data);
}

/**
 * Same as listData, but sends it without the / in the beginning.
 * Probably won't be used in the final product, but useful for Github Page demo
 */
httpsender.listData2 = function() {
  httpsender._http.get("platform-ui/Visualization/ListData").then(httpsender.populateDropDown_, function(fuck) {console.log(fuck)});
}

/**
 * Same as getData, but sends it without the / in the beginning.
 * Probably won't be used in the final product, but useful for Github Page demo
 */

httpsender.getData2 = function() {
  var successFunction = function(data) {
    console.log(data);
    httpsender.forwardData_(data["_result"]);
  }
  var e = document.getElementById("uri-select");
  httpsender._http.get("platform-ui/Visualization/GetData", { "uri" : e.options[e.selectedIndex].value })
    .then(successFunction, function(fuck) {console.log(fuck)});
}


function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}
