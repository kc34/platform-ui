var view = window.view || {};

view.text1 = "No request";
view.text2 = "No data";

view.canvasMainLoop = function() {
  $('#myCanvas').css('background-color', 'rgba(0, 0, 0, 1)');
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText(view.text1, 10, 50);
  ctx.fillText(view.text2, 10, 100);
}

view.getData = function(data) {
  console.log("Setting text!");
  view.text1 = "GET " + data.myURI
  view.text2 = "DATA: " + data.data;
}
