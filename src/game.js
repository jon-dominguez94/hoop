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
}

export default Game;