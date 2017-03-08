/**
* JS code related to the canvas where you display things on.
* Currently just a stub.
*/
var displaycanvas = window.displaycanvas || {};

/**
 * Starts the display canvas.
 */
displaycanvas.init = function() {
}

/**
 * This method is used to send data into the display canvas.
 */
displaycanvas.receiveData = function(data) {
    this.showResults(data);
}

/**
 * Displays the contents of the DB in tabular format on the web page.
 * @param {Object} jsonResponse - the JSON object containing the DB contents
 *                                in column major format
 */
displaycanvas.showResults = function (jsonResponse) {
    console.log(jsonResponse);
    if (!this.validateJson(jsonResponse)) {
        throw new this.JsonFormatException('JSON has illegal format.');
    }

    // Clear the div so that we can show the new results
    var resultsDiv = document.getElementById('resultsDiv');
    this.clearElementContents(resultsDiv);

    // Create a table for each returned dataset
    var datasets = jsonResponse['datasets'];
    for (var i = 0; i < datasets.length; i++) {
        var curDataset = datasets[i];

        // Create a table title (above the table)
        var tableTitle = document.createElement('h3');
        var tableTitleText = document.createTextNode(curDataset['datasetName']);
        tableTitle.appendChild(tableTitleText);
        resultsDiv.appendChild(tableTitle);

        // Create a new table
        var table = document.createElement('table');
        table.style.border = '1px solid #000';

        // Add all the column names (in the header row)
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        var j;
        for (j = 0; j < curDataset['columnNames'].length; j++) {
            var curColumnName = curDataset['columnNames'][j];

            // Create each column header
            var th = document.createElement('th');
            th.style.border = '1px solid #000';
            var thText = document.createTextNode(curColumnName);
            th.appendChild(thText);
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);

        // Add all of the initially empty rows
        var tbody = document.createElement('tbody');
        var tableRows = [];
        if (curDataset['columnNames'].length > 0) {
            var firstColName = curDataset['columnNames'][0];
            for (j = 0; j < curDataset['columnData'][firstColName].length; j++) {
                tr = document.createElement('tr');
                tableRows.push(tr);
            }
        }

        // Fill all of the rows with the appropriate data
        for (j = 0; j < curDataset['columnNames'].length; j++) {
            var curColName2 = curDataset['columnNames'][j];
            for (k = 0; k < curDataset['columnData'][curColName2].length; k++) {
                var curRow = tableRows[k];
                var curRowElement = curDataset['columnData'][curColName2][k];
                var td = document.createElement('td');
                td.style.border = '1px solid #000';
                var tdText = document.createTextNode(curRowElement);
                td.appendChild(tdText);
                curRow.appendChild(td);
            }
        }

        // Add all of the filled rows to the table body
        for (j = 0; j < tableRows.length; j++) {
            tbody.appendChild(tableRows[j]);
        }

        table.appendChild(tbody);
        resultsDiv.appendChild(table);
    }
}

/**
 * Ensures the JSON ojbect is properly formatted
 * @param {Object} jsonResponse - the JSON object
 * @returns {boolean} true iff the JSON object is properly formatted
 */
displaycanvas.validateJson = function (jsonResponse) {
    if (!jsonResponse.hasOwnProperty('datasets')) {
        return false;
    }

    // Check that each dataset has requried keys
    for (var i = 0; i < jsonResponse['datasets'].length; i++) {
        var curDataset = jsonResponse['datasets'][i];
        if (!curDataset.hasOwnProperty('datasetName')) {
            return false;
        }
        if (!curDataset.hasOwnProperty('metadata')) {
            return false;
        }
        if (!curDataset.hasOwnProperty('columnNames')) {
            return false;
        }
        if (!curDataset.hasOwnProperty('columnData')) {
            return false;
        }

        // Make sure the number of columns match the number of column names
        if (curDataset['columnNames'].length !== Object.keys(curDataset['columnData']).length) {
            return false;
        }

        // Make sure each column has the same number of rows
        var numRows = null;
        for (var j = 0; j < curDataset['columnNames'].length; j++) {
            var curColName = curDataset['columnNames'][j];
            if (j === 0) {
                numRows = curDataset['columnData'][curColName].length;
                continue;
            } else {
                if (numRows !== curDataset['columnData'][curColName].length) {
                    return false;
                }
            }
        }
    }

    return true;
}

/**
 * Clears the contents of the provided DOM element.
 * @param {Element} element - the element to clear
 */
displaycanvas.clearElementContents = function (element) {
    element.innerHTML = '';
}

displaycanvas.JsonFormatException = function (message) {
    this.message = message;
    this.name = 'JsonFormatException';
}
