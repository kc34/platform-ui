var httpsender = window.httpsender || {};

httpsender.init = function(config) {
  this.config = config;
}

httpsender.listData = function() {
  httpsender.sendGet("/ListData?uri=/", httpsender.populateDropDown);
}

httpsender.listData2 = function() {
  httpsender.sendGet("/ListData?uri=/", httpsender.populateDropDown);
}

httpsender.getData = function() {
  var successFunction = function(data, status) {
    httpsender.forwardData({ myURI : myURI, data: data });
  }
  var myURI = "/GetData?uri=" + $("#uri-select option:selected").text();
  httpsender.sendGet(myURI, successFunction);
}

httpsender.getData2 = function() {
  var successFunction = function(data, status) {
    httpsender.forwardData({ myURI : myURI, data: data });
  }
  var myURI = "/GetData";
  httpsender.sendGet(myURI, successFunction);
}

httpsender.sendGet = function(myURI, successFunction) {
  $.ajax(
    {
      url : myURI,
      method : "get",
      success : successFunction
    }
  );
}

httpsender.populateDropDown = function(data, status) {
  var mydata = JSON.parse(data);
  $("#uri-select").empty()
  for (var i = 0; i < mydata.uris.length; i++) {
    var option = mydata.uris[i];
    $("#uri-select").append($('<option>', { value: option, text: option }))
  }
}

httpsender.forwardData = function(data) {
  httpsender.config.dataTarget.getData(data);
}
