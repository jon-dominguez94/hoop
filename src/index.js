console.log("webpack is working");


import Game from './game';



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

const game = new Game();
window.game = game;
let container,
  context;

document.addEventListener('DOMContentLoaded', () => {
  init();
  initialize();
});

const initialize = () => {
  container = document.getElementById('game');
  // menu = document.getElementById('menu');
  canvas = document.getElementById('game-canvas');
  // scorePanel = document.getElementById('score');
  // startButton = document.getElementById('start-button');
  if (canvas && canvas.getContext) {
    context = canvas.getContext('2d');

    // Bind event listeners
    // startButton.addEventListener('click', onStartButtonClick, false);
    document.addEventListener('mousedown', onDocumentMouseDownHandler, false);
    document.addEventListener('mousemove', onDocumentMouseMoveHandler, false);
    // document.addEventListener('mouseup', onDocumentMouseUpHandler, false);
    // canvas.addEventListener('touchstart', onCanvasTouchStartHandler, false);
    // canvas.addEventListener('touchmove', onCanvasTouchMoveHandler, false);
    // canvas.addEventListener('touchend', onCanvasTouchEndHandler, false);
    // window.addEventListener('resize', onWindowResizeHandler, false);

    // Force an initial layout
    // onWindowResizeHandler();

    // createSprites();

    // Now that everything is laid out we can show the canvas & UI
    // container.fadeIn(MENU_FADE_IN_DURATION);
    // menu.hide().delay(MENU_FADE_IN_DURATION).fadeIn(MENU_FADE_IN_DURATION);

    // Update the game state
    // document.body.setAttribute('class', STATE_WELCOME);

    // reset();
    // update();
  }
  else {
    alert('Doesn\'t seem like your browser supports the HTML5 canvas element :(');
  }
};

const onDocumentMouseDownHandler = (e) => {
  game.mouse.down = true;
};

const onDocumentMouseMoveHandler(event) {
  mouse.previousX = mouse.x;
  mouse.previousY = mouse.y;

  mouse.x = event.clientX - (window.innerWidth - world.width) * 0.5;
  mouse.y = event.clientY - (window.innerHeight - world.height) * 0.5;

  mouse.velocityX = Math.abs(mouse.x - mouse.previousX) / world.width;
  mouse.velocityY = Math.abs(mouse.y - mouse.previousY) / world.height;
}