import constants from './constants';
import { Point, Multiplier } from './ancestors';
import { requestAnimFrame } from './util';
import Player from './entities/player';
import Region from './region';

class Game {
  constructor(menu){

    this.context;
    this.menu = menu;
    this.scorePanel = document.getElementById('score');

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

    this.dirtyRegions = [],

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

  reset() {
    this.player = new Player();
    this.player.x = this.mouse.x;
    this.player.y = this.mouse.y;

    this.notifications = [];
    this.intersections = [];
    this.particles = [];
    this.enemies = [];

    this.score = 0;
    this.duration = 0;
    this.playing = false;
    this.difficulty = 1;

    this.multiplier.reset();

    this.frameCount = 0;
    this.frameScore = 0;

    this.timeStart = 0;
    this.timeLastFrame = 0;
  }

  update(){
    this.clear();

    // There are quite the few updates and renders that only need
    // to be carried out while the game is active
    if (this.playing) {
      this.context.save();
      this.context.globalCompositeOperation = 'lighter';

      this.updateMeta();
      this.updatePlayer();
      // updateParticles();

      this.findIntersections();
      this.solveIntersections();

      this.renderPlayer();

      // updateEnemies();
      // renderEnemies();
      // renderParticles();

      this.context.restore();

      // renderNotifications();
    }


    // After the user has started his first game, this will never
    // go back to being 0
    if (this.score !== 0) {
      this.renderHeader();
    }
    // console.log('updated');
    requestAnimFrame(this.update.bind(this));
  }

  clear() {
    var i = this.dirtyRegions.length;

    while (i--) {
      var r = this.dirtyRegions[i];
      this.context.clearRect(Math.floor(r.x), Math.floor(r.y), Math.ceil(r.width), Math.ceil(r.height));
    }

    this.dirtyRegions = [];
  }

  start() {
    this.reset();

    this.timeStart = Date.now();
    this.timeLastFrame = this.timeStart;

    this.playing = true;

    // this.menu.fadeOut(constants.MENU_FADE_OUT_DURATION, function () {
      // Remove the header after the menu has appeared since
      // it will no longer be used
      document.getElementById('initial-header').remove();
    // });

    // Update the game state
    document.body.setAttribute('class', constants.STATE_PLAYING);
  }

  stop() {
    this.scorePanel.style.display = 'block';
    document.getElementById('score-p').innerHTML = Math.floor(score);

    this.playing = false;
    // menu.fadeIn(MENU_FADE_IN_DURATION);
  }

  invalidate(x, y, width, height) {
    this.dirtyRegions.push({
      x: x,
      y: y,
      width: width,
      height: height
    });
  }

  updatePlayer() {

    // Interpolate towards the mouse, results in smooth
    // movement
    this.player.interpolate(this.mouse.x, this.mouse.y, 0.4);

    // Add points to the trail, if needed
    while (this.player.trail.length < this.player.length) {
      this.player.trail.push(new Point(this.player.x, this.player.y));
    }

    // Remove the oldest point in the trail
    this.player.trail.shift();

    // No energy – no game
    if (this.player.energy === 0) {
      this.stop();
    }

  }

  renderPlayer() {
    // Begin the trail path
    this.context.beginPath();

    const bounds = new Region();
    const i = this.player.trail.length;

    // Draw a curve through the tail
    for (let i = 0, len = this.player.trail.length; i < len; i++) {
      var p1 = this.player.trail[i];
      var p2 = this.player.trail[i + 1];

      if (i === 0) {
        // This is the first loop, so we need to start by moving into position
        this.context.moveTo(p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2);
      }
      else if (p2) {
        // Draw a curve between the current and next trail point
        this.context.quadraticCurveTo(p1.x, p1.y, p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2);
      }

      bounds.inflate(p1.x, p1.y);
    }

    // Draw the trail stroke
    this.context.strokeStyle = "#FB7200";
    this.context.lineWidth = 2;
    this.context.stroke();

    bounds.expand(4, 4);

    var boundsRect = bounds.toRectangle();

    this.invalidate(boundsRect.x, boundsRect.y, boundsRect.width, boundsRect.height);
  }

  adjustScore(offset) {
    let multipliedOffset = 0;

    if (this.playing) {
      multipliedOffset = offset * this.multiplier.major;

      // Adjust the score, but scale the adjustment by a factor
      // of the framerate. This is done to avoid giving people
      // with low FPS an advantage.
      this.score += multipliedOffset * (this.fps / constants.FRAMERATE);
    }

    return multipliedOffset;
  }

  updateMeta() {
  // Fetch the current time for this frame
    const timeThisFrame = Date.now();

    // Increase the frame count
    this.framesThisSecond++;

    // Check if a second has passed since the last time we updated the FPS
    if (timeThisFrame > this.timeLastSecond + 1000) {
      // Establish the current, minimum and maximum FPS
      this.fps = Math.min(Math.round((this.framesThisSecond * 1000) / (timeThisFrame - this.timeLastSecond)), constants.FRAMERATE);
      this.fpsMin = Math.min(this.fpsMin, this.fps);
      this.fpsMax = Math.max(this.fpsMax, this.fps);

      this.timeLastSecond = timeThisFrame;
      this.framesThisSecond = 0;
    }

    this.timeDelta = timeThisFrame - this.timeLastFrame;
    this.timeFactor = this.timeDelta / (1000 / constants.FRAMERATE);

    // Increment the difficulty by a factor of the time
    // passed since the last rendered frame to ensure that
    // difficulty progresses at the same speed no matter what
    // FPS the game runs at
    this.difficulty += 0.002 * Math.max(this.timeFactor, 1);
    this.adjustScore(1);

    this.frameCount++;
    this.frameScore++;

    this.duration = timeThisFrame - this.timeStart;

    this.timeLastFrame = timeThisFrame;

  }

  renderHeader() {

    const padding = 10,
      energyBarHeight = 4,
      energyBarWidth = 100,
      ENERGY_LABEL = 'ENERGY:',
      MULTIPLIER_LABEL = 'MULTIPLIER:',
      TIME_LABEL = 'TIME:',
      SCORE_LABEL = 'SCORE:';

    this.player.animatedEnergy += (this.player.energy - this.player.animatedEnergy) * 0.2;

    this.context.fillStyle = 'rgba(0,0,0,0.5)';
    this.context.fillRect(0, 0, this.world.width, constants.HEADER_HEIGHT);

    this.context.save();
    this.context.translate(padding, padding);

    // Energy label
    this.context.font = "10px Arial";
    this.context.fillStyle = "#ffffff";
    this.context.fillText(ENERGY_LABEL, 0, 8);
    this.context.translate(56, 0);

    // Energy bar 
    this.context.save();
    this.context.fillStyle = 'rgba(40,40,40,0.8)';
    this.context.fillRect(0, 2, energyBarWidth, energyBarHeight);
    this.context.shadowOffsetX = 0;
    this.context.shadowOffsetY = 0;
    this.context.shadowBlur = 14;
    this.context.shadowColor = "rgba(255,150,0,0.9)";
    this.context.fillStyle = 'rgba(251,114,0, 0.8)';
    // this.context.shadowColor = "rgba(0,240,255,0.9)";
    // this.context.fillStyle = 'rgba(0,200,220, 0.8)';
    this.context.fillRect(0, 2, (this.player.animatedEnergy / 100) * energyBarWidth, energyBarHeight);
    this.context.restore();

    this.context.translate(122, 0);

    // Time label
    this.context.font = "10px Arial";
    this.context.fillStyle = "#ffffff";
    this.context.fillText(TIME_LABEL, 0, 8);

    // Time
    this.context.font = "bold 10px Arial";
    this.context.fillStyle = "rgba(251,114,0, 0.8)";
    this.context.fillText(Math.round(this.duration / 1000) + 's', 35, 8);

    this.context.translate(70, 0);

    // Score label
    this.context.font = "10px Arial";
    this.context.fillStyle = "#ffffff";
    this.context.fillText(SCORE_LABEL, 0, 8);

    // Score
    this.context.font = "bold 10px Arial";
    this.context.fillStyle = "rgba(251,114,0, 0.8)";
    this.context.fillText(Math.floor(score), 47, 8);
    
    this.context.translate(90, 0);
    
    // Multiplier label
    this.context.font = "10px Arial";
    this.context.fillStyle = "#ffffff";
    this.context.fillText(MULTIPLIER_LABEL, 0, 8);
    this.context.translate(73, 0);

    // Multiplier
    var i = constants.MULTIPLIER_LIMIT - 1;

    while (i--) {
      this.context.save();
      this.context.beginPath();

      const x = 6 + (i / constants.MULTIPLIER_LIMIT) * 80;
      const y = 5;
      const radius = 6;

      this.context.fillStyle = 'rgba(40,40,40,0.8)';
      this.context.arc(x, y, radius, 0, Math.PI * 2, true);
      this.context.fill();

      if (i < this.multiplier.major) {
        this.context.beginPath();
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowBlur = 14;
        // this.context.shadowColor = "rgba(0,240,255,0.9)";
        // this.context.fillStyle = 'rgba(0,200,220,0.8)';
        this.context.shadowColor = "rgba(255,150,0,0.9)";
        this.context.fillStyle = 'rgba(251,114,0, 0.8)';

        if (i < this.multiplier.major - 1) {
          // We're drawing a major (entirely filled) step
          this.context.arc(x, y, radius, 0, Math.PI * 2, true);
        }
        else {
          // We're drawing a minor (partly filled) step
          this.context.fillStyle = "rgba(251,114,0," + 0.8 * this.multiplier.minor + ")";
          // this.context.fillStyle = 'rgba(0,200,220,' + (0.8 * this.multiplier.minor) + ')';
          this.context.arc(x, y, radius * this.multiplier.minor, 0, Math.PI * 2, false);
        }

        this.context.fill();
      }

      this.context.restore();
    }

    this.context.restore();

    this.invalidate(0, 0, this.world.width, constants.HEADER_HEIGHT + 5);
  }

  findIntersections() {
    const candidates = [];
    for (let i = this.player.trail.length; i > 0; i--){
      
      const p1 = this.player.trail[i];
      const p2 = this.player.trail[i + 1];
      
      for (let j = this.player.trail.length; j > 0; j--){

        if (Math.abs(i - j) > 1) {
          const p3 = this.player.trail[j];
          const p4 = this.player.trail[j + 1];

          if (p1 && p2 && p3 && p4) {
            const intersection = this.findLineIntersection(p1, p2, p3, p4);
            if (intersection) {
              candidates.push([Math.min(i, j), Math.max(i, j), intersection]);
            }
          }
        }

      }
    }

    this.intersections = [];

    // Remove duplicates
    while (candidates.length) {
      var candidate = candidates.pop();
      for (let i = this.intersections.length; i > 0; i--){
        if (candidate && this.intersections[i] && candidate[0] === this.intersections[i][0] && candidate[1] === this.intersections[i][1]) {
          candidate = null;
        }
      }
      if (candidate) {
        this.intersections.push(candidate);
      }
    }

    // if(this.intersections.length) console.log(this.intersections);
  }

  findLineIntersection(p1, p2, p3, p4) {
    const delta1 = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    };

    const delta2 = {
      x: p4.x - p3.x,
      y: p4.y - p3.y
    };

    const diff1 = (-delta1.y * (p1.x - p3.x) + delta1.x * (p1.y - p3.y)) / (-delta2.x * delta1.y + delta1.x * delta2.y);
    const diff2 = (delta2.x * (p1.y - p3.y) - delta2.y * (p1.x - p3.x)) / (-delta2.x * delta1.y + delta1.x * delta2.y);

    if (diff1 >= 0 && diff1 <= 1 && diff2 >= 0 && diff2 <= 1) {
      return {
        x: p1.x + (diff2 * delta1.x),
        y: p1.y + (diff2 * delta1.y)
      };
    }

    return null;
  }

  solveIntersections() {

    while (this.intersections.length) {
      var last_intersection = this.intersections.pop();

      // Begin the trail path
      this.context.beginPath();

      const points = this.player.trail.slice(last_intersection[0], last_intersection[1]);
      points[0] = last_intersection[2];
      points.push(last_intersection[2]);

      const bounds = new Region();

      for (let i = 0, len = points.length; i < len; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        if (i === 0) {
          // This is the first loop, so we need to start by moving into position
          this.context.moveTo(p1.x, p1.y);
        }
        else if (p1 && p2) {
          // Draw a curve between the current and next trail point
          this.context.quadraticCurveTo(p1.x, p1.y, p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2);
        }

        bounds.inflate(p1.x, p1.y);
      }

      const center = bounds.center();
  
      const gradient = this.context.createRadialGradient(center.x, center.y, 0, center.x, center.y, bounds.size());
      // gradient.addColorStop(1, 'rgba(0, 255, 255, 0.0)');
      // gradient.addColorStop(0, 'rgba(0, 255, 255, 0.2)');
      gradient.addColorStop(1, "rgba(255, 150, 0, 0.0)");
      gradient.addColorStop(0, "rgba(255, 150, 0, 0.2)");
      this.context.fillStyle = gradient;
      this.context.closePath();

      this.context.fill();

    }
  }
}

export default Game;