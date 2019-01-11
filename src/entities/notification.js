import { Entity } from "../ancestors";

class Notification extends Entity {
  constructor(text, x, y, scale, rgb) {
    this.text = text || '';
    this.x = x || 0;
    this.y = y || 0;
    this.scale = scale || 1;
    this.rgb = rgb || [255, 255, 255];
    this.alpha = 1;
  }
}

export default Notification;
