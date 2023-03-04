export default class Bonus {
    constructor(x, y, width, height, color, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.speedX = speedX;
      this.speedY = speedY;
    }
  
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.fillRect(0,0,this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.closePath();
        ctx.restore();
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }
  
  