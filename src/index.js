console.log("webpack is working");

let canvas,
  ctx,
  prevX,
  currX,
  prevY,
  currY,
  lineColor = '#008080',
  lineSize = 2,
  width,
  height;

function init(){
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;

  canvas.addEventListener('mousemove', e => {
    findxy(e);
  });
  canvas.addEventListener('mouseout', e => {
    currX = currY = undefined;
  });
}

function draw(){
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineSize;
  ctx.stroke();
  ctx.closePath();
}

function findxy(e) {
  if(currX === undefined && currY === undefined){
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
  }
  prevX = currX;
  prevY = currY;
  currX = e.clientX - canvas.offsetLeft;
  currY = e.clientY - canvas.offsetTop;
  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();
