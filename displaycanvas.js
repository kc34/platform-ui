/**
 * JS code related to the canvas where you display things on.
 * Currently just a stub.
 */
var displaycanvas = window.displaycanvas || {};

/**
 * Starts the display canvas.
 */
displaycanvas.init = function() {
  $('#myCanvas').css('background-color', 'rgba(0, 0, 0, 1)');
  this.text1 = "No request";
  this.text2 = "No data";
  this.draw_();
}

/**
 * This method is used to send data into the display canvas.
 */
displaycanvas.receiveData = function(data) {
  console.log("Setting text!");
  this.text1 = "GET " + data.myURI;
  this.text2 = "DATA: " + data.data;
  this.draw_();
}

/**
 * Refreshes the display canvas.
 */
displaycanvas.draw_ = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText(this.text1, 10, 50);
  ctx.fillText(this.text2, 10, 100);
}
