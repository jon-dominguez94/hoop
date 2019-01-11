import { Entity } from '../ancestors';

class Particle extends Entity {
  constructor(x, y, speed, color) {
    this.x = x;
    this.y = y;

    this.velocity = {
      x: -speed + (Math.random() * speed * 2),
      y: -speed + (Math.random() * speed * 2)
    };

    this.color = color;
    this.alpha = 1;
    this.fading = false;
  }
}

export default Particle;