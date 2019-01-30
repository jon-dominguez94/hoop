export class Point {

  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  distanceTo(p) {
    var dx = p.x - this.x;
    var dy = p.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  clonePosition() {
    return { x: this.x, y: this.y };
  }

  interpolate(x, y, amp) {
    this.x += (x - this.x) * amp;
    this.y += (y - this.y) * amp;
  }
}

export class Entity extends Point{
  constructor(x, y){
    super(x, y);
    this.alive = false;
  }
}

export class Multiplier {
  constructor(step, max){
    this.major = 1;
    this.minor = 0;

    this.max = max;
    this.step = step;
  }

  reset(){
    this.major = 1;
    this.minor = 0;
  }

  increase() {
    // if(this.major < this.max){
      this.minor += this.step;

      while (this.minor >= 1) {
        if (this.major < this.max + 1) {
          this.major++;
        }

        this.minor = 1 - this.minor;
      }
    }
  // }
}