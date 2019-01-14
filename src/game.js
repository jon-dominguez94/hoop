import constants from './constants';
import { Point, Multiplier } from './ancestors';
import { requestAnimFrame } from './util';
import Player from './entities/player';
import Enemy from './entities/enemy';
import Particle from './entities/particle';
import Notification from './entities/notification';
import Region from './region';

class Game {
  constructor(){

    this.context;
    this.menu = document.getElementById("menu");
    this.scorePanel = document.getElementById('score');

    this.mouse = {
      x: 0,
      y: 0,
      previousX: 0,
      previousY: 0,
      velocityX: 0,
      velocityY: 0
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
    const canvasWidth = 64, canvasHeight = 64;
    let cvs, ctx;

    cvs = document.createElement('canvas');
    cvs.setAttribute('width', canvasWidth);
    cvs.setAttribute('height', canvasHeight);
    ctx = cvs.getContext('2d');
    ctx.beginPath();
    ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, constants.ENEMY_SIZE, 0, Math.PI * 2, true);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(0,200,220, 0.9)';
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
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
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
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
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
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

    if (this.playing) {
      this.context.save();
      this.context.globalCompositeOperation = 'lighter';

      this.updateMeta();
      this.updatePlayer();
      this.updateParticles();

      this.findIntersections();
      this.solveIntersections();

      this.renderPlayer();

      this.updateEnemies();
      this.renderEnemies();
      this.renderParticles();

      this.context.restore();

      this.renderNotifications();
    }

    if (this.score !== 0) {
      this.renderHeader();
    }
   
    requestAnimFrame(this.update.bind(this));
  }

  clear() {
    for (let i = this.dirtyRegions.length - 1; i >= 0; i--){
      var dirtyRegion = this.dirtyRegions[i];
      this.context.clearRect(Math.floor(dirtyRegion.x), Math.floor(dirtyRegion.y), Math.ceil(dirtyRegion.width), Math.ceil(dirtyRegion.height));
    }

    this.dirtyRegions = [];
  }

  start() {
    this.reset();

    this.timeStart = Date.now();
    this.timeLastFrame = this.timeStart;

    this.playing = true;

    const ih = document.getElementById('initial-header');
    if(ih) ih.remove();
    document.getElementById('score').classList.add('hidden');
    this.menu.classList.add('fade-out');
    setTimeout(() => {
      this.menu.classList.add('behind');
    }, 700);
  }
    
  stop() {
      this.scorePanel.style.display = 'block';
      document.getElementById('score-p').innerHTML = Math.floor(this.score);
      
      this.playing = false;

      this.menu.classList.remove('behind');
      this.menu.classList.remove('fade-out');
      document.getElementById('score').classList.remove('hidden');
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
    this.player.interpolate(this.mouse.x, this.mouse.y, 0.4);

    while (this.player.trail.length < this.player.length) {
      this.player.trail.push(new Point(this.player.x, this.player.y));
    }

    this.player.trail.shift();
    if (this.player.energy === 0) {
      this.stop();
    }
  }

  renderPlayer() {
    this.context.beginPath();
    const bounds = new Region();

    for (let i = 0; i < this.player.trail.length; i++) {
      var p1 = this.player.trail[i];
      var p2 = this.player.trail[i + 1];

      if (i === 0) {
        this.context.moveTo(p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2);
      }
      else if (p2) {
        this.context.quadraticCurveTo(p1.x, p1.y, p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2);
      }

      bounds.inflate(p1.x, p1.y);
    }
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
    this.context.fillText(Math.floor(this.score), 47, 8);
    
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

    if (this.frameCount % 2 == 1) {

      var bmp = this.context.getImageData(0, 0, this.world.width, this.world.height);
      var bmpw = bmp.width;
      var pixels = bmp.data;
      var casualties = [];

      // var i = this.enemies.length;

      // while (i--) {
      for(let i = this.enemies.length - 1; i >= 0; i--){
        var enemy = this.enemies[i];

        var ex = Math.round(enemy.x);
        var ey = Math.round(enemy.y);

        var indices = [
          ((ey * bmpw) + Math.round(ex - constants.ENEMY_SIZE)) * 4,
          ((ey * bmpw) + Math.round(ex + constants.ENEMY_SIZE)) * 4,
          ((Math.round(ey - constants.ENEMY_SIZE) * bmpw) + ex) * 4,
          ((Math.round(ey + constants.ENEMY_SIZE) * bmpw) + ex) * 4
        ];

        var j = indices.length;

        while (j--) {
          var index = indices[j];
          // console.log(`first: ${pixels[index + 1]}`);
          // console.log(`second: ${pixels[index + 2]}`);
          if (pixels[index + 1] > 0 && pixels[index + 2] === 0) {

            if (enemy.type === constants.ENEMY_TYPE_BOMB || enemy.type === constants.ENEMY_TYPE_BOMB_MOVER) {
              this.handleBombInClosure(enemy);
            }
            else {
              this.handleEnemyInClosure(enemy);

              casualties.push(enemy);
            }

            this.enemies.splice(i, 1);

            break;
          }
        }
      }

      // If more than one enemy was killed, show the multiplier
      if (casualties.length > 1) {
        // Increase the score exponential depending on the number of
        // casualties
        var scoreChange = this.adjustScore(casualties.length * constants.SCORE_PER_ENEMY);

        this.notify(scoreChange, this.player.x, this.player.y - 10, casualties.length / 1.5, [250, 250, 100]);
      }

    }
  }

  updateEnemies() {

    let enemy;
    const padding = 60;
    let numberOfBombs = 0;

    for(let i = this.enemies.length - 1; i >= 0; i--){
      if (this.enemies[i].type === constants.ENEMY_TYPE_BOMB) {
        numberOfBombs++;
      }
    }

    const canAddBombs = numberOfBombs / this.enemies.length < 0.4;
    let missingEnemies = Math.floor(constants.ENEMY_COUNT + this.difficulty) - this.enemies.length;

    while (missingEnemies-- && Math.random() > 0.85) {

      let type = constants.ENEMY_TYPE_NORMAL;

      if (canAddBombs) {
        type = Math.random() > 0.5 ? type : constants.ENEMY_TYPE_BOMB;
      }

      enemy = new Enemy();
      enemy.x = padding + Math.round(Math.random() * (this.world.width - padding - padding));
      enemy.y = padding + Math.round(Math.random() * (this.world.height - padding - padding));
      enemy.type = type;

      this.enemies.push(enemy);
    }

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      enemy = this.enemies[i];
      enemy.time = Math.min(enemy.time + (0.2 * this.timeFactor), 100);
      enemy.scale += ((enemy.scaleTarget - enemy.scale) + 0.01) * 0.3;
      enemy.alpha += (enemy.alphaTarget - enemy.alpha) * 0.1;

      if (enemy.alive && enemy.time === 100) {
        if (enemy.type === constants.ENEMY_TYPE_BOMB) {
          this.handleBombDeath(enemy);
        }
        else {
          this.handleEnemyDeath(enemy);
          this.enemies.splice(i, 1);
        }
        enemy.alive = false;
      }

      if (enemy.alive === false && enemy.alphaTarget === 0 && enemy.alpha < 0.05) {
        this.enemies.splice(i, 1);
      }
    }

  }

  renderEnemies() {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      var enemy = this.enemies[i];

      var sprite = null;

      if (enemy.type === constants.ENEMY_TYPE_BOMB) {
        sprite = this.sprites.bomb;
      } else {
        sprite = this.sprites.enemy;

        if (enemy.time > 65) {
          sprite = this.sprites.enemyDyingA;
          if (Math.round(enemy.time) % 2 === 0) {
            sprite = this.sprites.enemyDyingB;
          }
        }
      }

      this.context.save();
      this.context.globalAlpha = enemy.alpha;

      this.context.translate(Math.round(enemy.x), Math.round(enemy.y));
      this.context.scale(enemy.scale, enemy.scale);
      this.context.drawImage(sprite, -Math.round(sprite.width / 2), -Math.round(sprite.height / 2));

      this.context.restore();

      var spriteWidth = sprite.width * enemy.scale + 4;
      var spriteHeight = sprite.height * enemy.scale + 4;

      this.invalidate(enemy.x - spriteWidth / 2, enemy.y - spriteWidth / 2, spriteWidth, spriteHeight);
    }
  }

  handleBombDeath(entity) {
    entity.alphaTarget = 0;
    entity.scaleTarget = 0.01;
  }

  handleEnemyDeath(entity) {
    this.player.adjustEnergy(constants.ENERGY_PER_ENEMY_DEATH);
    this.multiplier.reset();

    this.emitParticles('#eeeeee', entity.x, entity.y, 3, 15);

    this.notify(constants.ENERGY_PER_ENEMY_DEATH + '♥', entity.x, entity.y, 1.2, [230, 90, 90]);

  }

  emitParticles(color, x, y, speed, quantity) {
    while (quantity--) {
      this.particles.push(new Particle(x, y, speed, color));
    }
  }

  updateParticles() {

    // var i = this.particles.length;

    // while (i--) {
    for(let i = this.particles.length - 1; i >= 0; i--){
      const particle = this.particles[i];

      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;

      particle.velocity.x *= 0.98;
      particle.velocity.y *= 0.98;

      if (particle.fading === true) {
        particle.alpha *= 0.92;
      }
      else if (Math.random() > 0.92) {
        particle.fading = true;
      }

      if (particle.alpha < 0.05) {
        this.particles.splice(i, 1);
      }
    }

  }

  renderParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      this.context.save();
      this.context.globalAlpha = particle.alpha;
      this.context.fillStyle = particle.color;
      this.context.fillRect(particle.x, particle.y, 3, 3);
      this.context.restore();

      this.invalidate(particle.x - 2, particle.y - 2, 6, 6);
    }
  }

  notify(text, x, y, scale, rgb) {
    this.notifications.push(new Notification(text, x, y, scale, rgb));
  }

  renderNotifications() {
    for(let i = this.notifications.length - 1; i >= 0; i--){
      const notification = this.notifications[i];

      // Make the text float upwards
      notification.y -= 0.4;

      let radius = 14 * notification.scale;

      // Draw the notification
      this.context.save();
      this.context.font = 'bold ' + Math.round(12 * notification.scale) + "px Arial";

      this.context.beginPath();
      this.context.fillStyle = 'rgba(0,0,0,' + (0.7 * notification.alpha) + ')';
      this.context.arc(notification.x, notification.y, radius, 0, Math.PI * 2, true);
      this.context.fill();

      this.context.fillStyle = "rgba( " + notification.rgb[0] + ", " + notification.rgb[1] + ", " + notification.rgb[2] + ", " + notification.alpha + " )";
      this.context.fillText(notification.text, notification.x - (this.context.measureText(notification.text).width * 0.5), notification.y + (4 * notification.scale));
      this.context.restore();

      // Fade out
      notification.alpha *= 1 - (0.08 * (1 - ((notification.alpha - 0.08) / 1)));

      // If the notifaction is faded out, remove it
      if (notification.alpha < 0.05) {
        this.notifications.splice(i, 1);
      }

      radius += 2;

      this.invalidate(notification.x - radius, notification.y - radius, radius * 2, radius * 2);
    }
  }

  handleEnemyInClosure(entity) {
    this.player.adjustEnergy(constants.ENERGY_PER_ENEMY_ENCLOSED);

    const multMajor = this.multiplier.major;
    this.multiplier.increase();

    if (this.multiplier.major > multMajor) {
      this.notify('X' + this.multiplier.major, this.world.width / 2, this.world.height / 2, this.multiplier.major, [60, 250, 130]);
    }

    this.emitParticles('#eeeeee', entity.x, entity.y, 3, 6);

    const scoreChange = this.adjustScore(constants.SCORE_PER_ENEMY);

    this.notify('' + Math.floor(scoreChange), entity.x, entity.y);
  }

  handleBombInClosure(entity) {
    this.player.adjustEnergy(constants.ENERGY_PER_BOMB_ENCLOSED);
    this.multiplier.reset();

    this.notify(constants.ENERGY_PER_BOMB_ENCLOSED + '♥', entity.x, entity.y, 1.2, [230, 90, 90]);


  }

}

export default Game;