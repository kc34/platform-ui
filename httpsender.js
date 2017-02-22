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
  // httpsender.sendGet_("/ListData?uri=/", httpsender.populateDropDown_);
  httpsender._http.get("ListData").then(httpsender.populateDropDown_, function(fuck) {console.log(fuck)});
}

/**
 * Sends the get request: GET /GetData?uri= ...
 */
httpsender.getData = function() {
  var successFunction = function(data, status) {
    httpsender.forwardData_({ myURI : myURI, data: data });
  }
  var myURI = "/GetData?uri=" + $("#uri-select option:selected").text();
  httpsender.sendGet_(myURI, successFunction);
}

/**
 * Helper function to send a GET request
 */
httpsender.sendGet_ = function(myURI, successFunction) {
  $.ajax(
    {
      url : myURI,
      method : "get",
      success : successFunction
    }
  );
}

/**
 * Fills in the dropdown menu from a JSON object of { uris: [..., ..., ...,] }
 */
httpsender.populateDropDown_ = function(data) {
  var mydata = data["_result"];
  $("#uri-select").empty()
  for (var i = 0; i < mydata.uris.length; i++) {
    var option = mydata.uris[i];
    $("#uri-select").append($('<option>', { value: option, text: option }))
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
  httpsender.sendGet_("ListData?uri=/", httpsender.populateDropDown_);
}

/**
 * Same as getData, but sends it without the / in the beginning.
 * Probably won't be used in the final product, but useful for Github Page demo
 */
httpsender.getData2 = function() {
  var successFunction = function(data, status) {
    httpsender.forwardData_({ myURI : myURI, data: data });
  }
  var myURI = "GetData?uri=" + $("#uri-select option:selected").text();
  httpsender.sendGet_(myURI, successFunction);
}
