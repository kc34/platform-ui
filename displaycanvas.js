/**
 * JS code related to the canvas where you display things on.
 * Currently just a stub.
 */
var displaycanvas = window.displaycanvas || {};

/**
 * Starts the display canvas.
 */
displaycanvas.init = function() {
  document.getElementById("myCanvas").style.backgroundColor = 'rgba(0, 0, 0, 1)';
  this.text = "No data";
  this.draw_();
}

/**
 * This method is used to send data into the display canvas.
 */
displaycanvas.receiveData = function(data) {
  this.text = JSON.stringify(data);
  this.draw_();
}

/**
 * Refreshes the display canvas.
 */
displaycanvas.draw_ = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "15px monospace";
  ctx.fillStyle = 'white';
  var i = 30;
  var j = 0;
  var indent_level = 0;
  for (var x = 0; x < this.text.length; x++) {
    if (this.text[x] == "}" || this.text[x] == "]") {
      i += 30
      indent_level -= 1;
      j = indent_level * 40;
    }
    ctx.fillText(this.text[x], j, i);
    if (this.text[x] == "{" || this.text[x] == "[") {
      i += 30
      indent_level += 1;
      j = indent_level * 40;
    } else if (this.text[x] == ",") {
      i += 30
      j = indent_level * 40;
    } else {
      j = j + 15;
    }
  }
}
