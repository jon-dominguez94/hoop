console.log("webpack is working");

let canvas,
  ctx,
  prevX = 0,
  currX = 0,
  prevY = 0,
  currY = 0,
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
    findxy('move', e)
  });
}