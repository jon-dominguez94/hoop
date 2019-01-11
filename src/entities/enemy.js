import { Entity } from '../ancestors';

class Enemy extends Entity{
  constructor(){
    this.scale = 0.01;
    this.scaleTarget = 1;

    this.alpha = 0;
    this.alphaTarget = 1;

    this.time = 0;
    this.type = 1;

    this.velocity = { x: 0, y: 0 };

    this.alive = true;
  }
}

export default Enemy;