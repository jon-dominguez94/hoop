import constants from './constants';
import { Multiplier } from './ancestors';
import Player from './entities/player';

class Game {
  constructor(){
    this.mouse = {
      x: 0,
      y: 0,
      previousX: 0,
      previousY: 0,
      velocityX: 0,
      velocityY: 0,
      down: false
    };

    this.world = {
      width: constants.DEFAULT_WIDTH,
      height: constants.DEFAULT_HEIGHT
    };

    this.sprites = {
      bomb: null,
      enemy: null,
      enemyDyingA: null,
      enemyDyingB: null
    };

    this.playing = false,
    this.score = 0,
    this.duration = 0,
    this.difficulty = 1,
    this.multiplier = new Multiplier(0.2, constants.MULTIPLIER_LIMIT);

    this.frameScore = 0,
    this.frameCount = 0,
    this.timeStart = Date.now(),
    this.timeLastFrame = Date.now(),
    this.timeLastSecond = Date.now(),
    this.timeGameStart = Date.now(),
    this.timeDelta = 0,
    this.timeFactor = 0,
    this.fps = 0,
    this.fpsMin = 1000,
    this.fpsMax = 0,
    this.framesThisSecond = 0;

    this.notifications = [],
    this.intersections = [],
    this.particles = [],
    this.enemies = [],
    this.player = new Player();
  }

  createSprites() {
    const canvasWidth = 64,
    canvasHeight = 64;
    let cvs,
    ctx;

    cvs = document.createElement('canvas');
    cvs.setAttribute('width', canvasWidth);
    cvs.setAttribute('height', canvasHeight);
    ctx = cvs.getContext('2d');
    ctx.beginPath();
    ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, constants.ENEMY_SIZE, 0, Math.PI * 2, true);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(0,200,220, 0.9)';
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.shadowColor = 'rgba(0,240,255,0.9)';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.fill();

    this.sprites.enemy = cvs;

    cvs = document.createElement('canvas');
    cvs.setAttribute('width', canvasWidth);
    cvs.setAttribute('height', canvasHeight);
    ctx = cvs.getContext('2d');
    ctx.beginPath();
    ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, constants.ENEMY_SIZE * 1.4, 0, Math.PI * 2, true);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(190,220,90, 0.9)';
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.shadowColor = 'rgba(220,240,150,0.9)';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.fill();

    this.sprites.enemyDyingA = cvs;

    cvs = document.createElement('canvas');
    cvs.setAttribute('width', canvasWidth);
    cvs.setAttribute('height', canvasHeight);
    ctx = cvs.getContext('2d');
    ctx.beginPath();
    ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, constants.ENEMY_SIZE * 1.4, 0, Math.PI * 2, true);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(190,220,90, 0.9)';
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.shadowColor = 'rgba(220,240,150,0.9)';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.fill();

    this.sprites.enemyDyingB = cvs;

    cvs = document.createElement('canvas');
    cvs.setAttribute('width', canvasWidth);
    cvs.setAttribute('height', canvasHeight);
    ctx = cvs.getContext('2d');
    ctx.beginPath();
    ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, constants.ENEMY_SIZE, 0, Math.PI * 2, true);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(220,50,50, 0.9)';
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.shadowColor = "rgba(255,100,100,0.9)";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.fill();

    this.sprites.bomb = cvs;
  }
}

export default Game;