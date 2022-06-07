var colors = ["#4f0000", "green", "purple", "rgb(168, 50, 3)"];
var colorIndex = 0;
function changeColor() {
  var col = document.getElementById("body");
  if (colorIndex >= colors.length) {
    colorIndex = 0;
  }
  col.style.backgroundColor = colors[colorIndex];
  colorIndex++;
}

const btn = document.querySelector("button"); // Get the button from the page
// Detect clicks on the button
if (btn) {
  btn.onclick = function () {
    // The JS works in conjunction with the 'dipped' code in style.css
    btn.classList.toggle("dipped");
    changeColor();
  };
}
