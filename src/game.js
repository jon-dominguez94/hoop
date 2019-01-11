class Game {
  constructor(){
    this.mouse = {
      // The current position
      x: 0,
      y: 0,

      // The position previous to the current
      previousX: 0,
      previousY: 0,

      // The velocity, based on the difference between
      // the current and next positions
      velocityX: 0,
      velocityY: 0,

      // Flags if the mouse is currently pressed down
      down: false
    };
  }
}

export default Game;