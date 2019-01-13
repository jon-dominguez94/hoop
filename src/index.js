import Game from './game';
import constants from './constants';

let container, menu, game, canvas;

document.addEventListener('DOMContentLoaded', () => {
  initialize();
});

const initialize = () => {


  container = document.getElementById('game');
  menu = document.getElementById('menu');
  canvas = document.getElementById('game-canvas');
  const startButton = document.getElementById('start-button');

  game = new Game(menu);
  window.game = game;

  if (canvas && canvas.getContext) {
    game.context = canvas.getContext('2d');

    // Bind event listeners
    startButton.addEventListener('click', onStartButtonClick, false);
    document.addEventListener('mousedown', onDocumentMouseDownHandler, false);
    document.addEventListener('mousemove', onDocumentMouseMoveHandler, false);
    document.addEventListener('mouseup', onDocumentMouseUpHandler, false);
    // canvas.addEventListener('touchstart', onCanvasTouchStartHandler, false);
    // canvas.addEventListener('touchmove', onCanvasTouchMoveHandler, false);
    // canvas.addEventListener('touchend', onCanvasTouchEndHandler, false);
    window.addEventListener('resize', onWindowResizeHandler, false);

    // Force an initial layout
    onWindowResizeHandler();

    game.createSprites();

    // Now that everything is laid out we can show the canvas & UI
    // container.fadeIn(MENU_FADE_IN_DURATION);
    // menu.hide().delay(MENU_FADE_IN_DURATION).fadeIn(MENU_FADE_IN_DURATION);

    // Update the game state
    document.body.setAttribute('class', constants.STATE_WELCOME);

    game.reset();
    game.update();
  }
  else {
    alert('Doesn\'t seem like your browser supports the HTML5 canvas element :(');
  }
};

const onStartButtonClick = (event) => {
  game.start();
  event.preventDefault();
};

const onDocumentMouseDownHandler = (e) => {
  game.mouse.down = true;
};

const onDocumentMouseMoveHandler = (event) => {
  game.mouse.previousX = game.mouse.x;
  game.mouse.previousY = game.mouse.y;

  game.mouse.x = event.clientX - (window.innerWidth - game.world.width) * 0.5;
  game.mouse.y = event.clientY - (window.innerHeight - game.world.height) * 0.5;

  game.mouse.velocityX = Math.abs(game.mouse.x - game.mouse.previousX) / game.world.width;
  game.mouse.velocityY = Math.abs(game.mouse.y - game.mouse.previousY) / game.world.height;
};

const onDocumentMouseUpHandler = (event) => {
  game.mouse.down = false;
  console.log(game.mouse);
};

const onWindowResizeHandler = () => {

  // Update the game size
  // game.world.width = constants.TOUCH_INPUT ? window.innerWidth : constants.DEFAULT_WIDTH;
  // game.world.height = constants.TOUCH_INPUT ? window.innerHeight : constants.DEFAULT_HEIGHT;
  game.world.width = window.innerWidth < constants.DEFAULT_WIDTH ? window.innerWidth : constants.DEFAULT_WIDTH;
  game.world.height = window.innerHeight < constants.DEFAULT_HEIGHT ? window.innerHeight : constants.DEFAULT_HEIGHT;

  container.style.width = (game.world.width);
  container.style.height = (game.world.height);

  canvas.width = game.world.width;
  canvas.height = game.world.height;

  var canvasX = Math.max((window.innerWidth - game.world.width) * 0.5, 1);
  var canvasY = Math.max((window.innerHeight - game.world.height) * 0.5, 1);

  container.style.left = canvasX;
  container.style.top = canvasY;

  menu.style.left = (game.world.width - menu.style.width) / 2;
  menu.style.top = (game.world.height - menu.style.width) / 2;

};