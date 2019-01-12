console.log("webpack is working");


import Game from './game';
import constants from './constants';


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
    document.addEventListener('mouseup', onDocumentMouseUpHandler, false);
    canvas.addEventListener('touchstart', onCanvasTouchStartHandler, false);
    canvas.addEventListener('touchmove', onCanvasTouchMoveHandler, false);
    canvas.addEventListener('touchend', onCanvasTouchEndHandler, false);
    window.addEventListener('resize', onWindowResizeHandler, false);

    // Force an initial layout
    onWindowResizeHandler();

    game.createSprites();

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
  // console.log(game.mouse);
};

const onDocumentMouseMoveHandler = (event) => {
  game.mouse.previousX = game.mouse.x;
  game.mouse.previousY = game.mouse.y;

  game.mouse.x = event.clientX - (window.innerWidth - game.world.width) * 0.5;
  game.mouse.y = event.clientY - (window.innerHeight - game.world.height) * 0.5;

  game.mouse.velocityX = Math.abs(game.mouse.x - game.mouse.previousX) / game.world.width;
  game.mouse.velocityY = Math.abs(game.mouse.y - game.mouse.previousY) / game.world.height;
  // console.log(game.mouse);
};

const onDocumentMouseUpHandler = (event) => {
  game.mouse.down = false;
  console.log(game.mouse);
};

const onCanvasTouchStartHandler = (event) => {
  if (event.touches.length == 1) {
    event.preventDefault();

    game.mouse.x = event.touches[0].pageX - (window.innerWidth - game.world.width) * 0.5;
    game.mouse.y = event.touches[0].pageY - (window.innerHeight - game.world.height) * 0.5;

    game.mouse.down = true;
  }
  // console.log(game.mouse);
};

const onCanvasTouchMoveHandler = (event) => {
  if (event.touches.length == 1) {
    event.preventDefault();

    game.mouse.x = event.touches[0].pageX - (window.innerWidth - game.world.width) * 0.5;
    game.mouse.y = event.touches[0].pageY - (window.innerHeight - game.world.height) * 0.5 - 20;
  }
  // console.log(game.mouse);

};

const onCanvasTouchEndHandler = (event) => {
  game.mouse.down = false;
  // console.log(game.mouse);

};

const onWindowResizeHandler = () => {
  // Update the game size
  game.world.width = constants.TOUCH_INPUT ? window.innerWidth : constants.DEFAULT_WIDTH;
  game.world.height = constants.TOUCH_INPUT ? window.innerHeight : constants.DEFAULT_HEIGHT;

  // Resize the container
  container.style.width = (game.world.width);
  container.style.height = (game.world.height);

  // Resize the canvas
  canvas.width = game.world.width;
  canvas.height = game.world.height;

  // Determine the x/y position of the canvas
  var cx = Math.max((window.innerWidth - game.world.width) * 0.5, 1);
  var cy = Math.max((window.innerHeight - game.world.height) * 0.5, 1);

  // Update the position of the canvas
  container.style.left = cx;
  container.style.top = cy;

  // Center the menu
  // menu.css({
  //   left: (game.world.width - menu.width()) / 2,
  //   top: (game.world.height - menu.height()) / 2
  // });

};