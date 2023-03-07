import { circRectsOverlap } from "./Collisions.js";

export default class Bonus {
  constructor(name, img, width, height) {
    this.name = name;
    this.img = img;
    this.x = random(50, 950);
    this.y = random(300, 500);
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.drawImage(this.img, Math.random()+this.x, Math.random()+this.y, this.width, this.height);
  }
  
}
function random(min, max) {
  return Math.random() * (max - min) + min;
}

