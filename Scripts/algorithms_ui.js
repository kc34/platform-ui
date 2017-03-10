var AlgorithmsUi = function(document, options) {
    this._http = new chumbucket.HTTPClient();
    this._loadButton = document.querySelector(options['loadButton']);
    this._algorithmSelectBox = document.querySelector(options['algorithmSelectBox']);
    this._inputTableSelectBox = document.querySelector(options['inputTableSelectBox']);
    this._outputTableSelectBox = document.querySelector(options['outputTableSelectBox']);
    this._goButton = document.querySelector(options['goButton']);
    this._statusViewerDiv = document.querySelector(options['statusViewerDiv']);
}

AlgorithmsUi.prototype.boot = function() {

    var ref = this;

    var loadSuccess = function(result) {
        var mydata = result['_result']
        AlgorithmsUi.reloadSelectBox(ref._algorithmSelectBox, mydata['algorithms']);
        AlgorithmsUi.reloadSelectBox(ref._inputTableSelectBox, mydata['inputTables']);
        AlgorithmsUi.reloadSelectBox(ref._outputTableSelectBox, mydata['outputTables']);
    }

    var failure = function(result) {
        console.log(result);
    }

    this._loadButton.onclick = function() {
        var query = { 'uri' : 'placeholer' };
        ref._http.get('Algorithms/LoadData', query)
            .then(loadSuccess, failure);
    }

    var goSuccess = function(result) {
        ref._statusViewerDiv.innerHTML = JSON.stringify(result);
    }

    this._goButton.onclick = function() {
        var query = {
            'algorithm' : AlgorithmsUi.getSelected(ref._algorithmSelectBox),
            'inputTable' : AlgorithmsUi.getSelected(ref._inputTableSelectBox),
            'outputTable' : AlgorithmsUi.getSelected(ref._outputTableSelectBox)};
        ref._http.get('Algorithms/SubmitJob', query)
            .then(goSuccess, failure);
    }


}

AlgorithmsUi.reloadSelectBox = function(selectBox, data) {
    // Clear the select box
    for (var i = selectBox.options.length - 1 ; i >= 0 ; i--) {
        selectBox.remove(i);
    }
    // Fill the select box
    for (var i = 0; i < data.length; i++) {
        var option = data[i];
        selectBox[i] = new Option(option, option);
    }
}

AlgorithmsUi.getSelected = function(selectBox) {
    return selectBox.options[selectBox.selectedIndex].value;
}
