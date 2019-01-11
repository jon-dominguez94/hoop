import { Entity } from '../ancestors.js';

class Player extends Entity {
  constructor(){
    this.trail = [];
    this.size = 8;
    this.length = 45;
    this.energy = 100;
    this.animatedEnergy = 0;
  }

  adjustEnergy(offset){
    this.energy = Math.min(Math.max(this.energy + offset, 0), 100);
  
  }
}

export default Player;