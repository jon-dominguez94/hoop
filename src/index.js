import Game from './game';
import constants from './constants';

let container, game, canvas;

document.addEventListener('DOMContentLoaded', () => {
  initialize();
});

const initialize = () => {
  container = document.getElementById('game');
  canvas = document.getElementById('game-canvas');
  const startButton = document.getElementById('start-button');

  game = new Game();

  if (canvas && canvas.getContext) {
    game.context = canvas.getContext('2d');

    startButton.addEventListener('click', onStartButtonClick, false);
    document.addEventListener('mousemove', onDocumentMouseMoveHandler, false);
    window.addEventListener('resize', onWindowResizeHandler, false);

    onWindowResizeHandler();

    game.createSprites();
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

const onDocumentMouseMoveHandler = (event) => {
  game.mouse.previousX = game.mouse.x;
  game.mouse.previousY = game.mouse.y;

  game.mouse.x = event.clientX - (window.innerWidth - game.world.width) * 0.5;
  // game.mouse.y = event.clientY - (window.innerHeight - game.world.height) * 0.5;
  // mouse tracking fix. TODO: find real solution
  game.mouse.y = event.clientY - (window.innerHeight - game.world.height) * 0.5 - 30;

  console.log({
    gameMouseX: game.mouse.x,
    eventclientX: event.clientX,
    windowinnerWidth: window.innerWidth,
    gameWorldWidth: game.world.width,
    gameMouseY: game.mouse.y,
    eventclienty: event.clientY,
    windowinnerheight: window.innerHeight,
    gameWorldheight: game.world.height
  });

  game.mouse.velocityX = Math.abs(game.mouse.x - game.mouse.previousX) / game.world.width;
  game.mouse.velocityY = Math.abs(game.mouse.y - game.mouse.previousY) / game.world.height;
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
};