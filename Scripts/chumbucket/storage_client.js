chumbucket.StorageClient = function (http) {
    this._http = http;
};

chumbucket.StorageClient.prototype.listBuckets = function() {
    return this._http.get('ingestion/listBuckets');
};

chumbucket.StorageClient.prototype.listFilesInBucket = function(uri) {
    return this._http.get('ingestion/listFilesInBucket', { 'uri': uri });
};

chumbucket.StorageClient.prototype.getDirectFileUri = function(uri) {
    return this._http.get('ingestion/getDirectUri', { 'uri': uri });
};

chumbucket.StorageClient.prototype.deleteFileByUri = function(uri) {
    return this._http.delete('ingestion/delete', { 'uri': uri });
};
