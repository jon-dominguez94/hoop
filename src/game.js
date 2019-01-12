import constants from './constants';

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
  }
}

export default Game;