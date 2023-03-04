export default class PaddleBonus {
    constructor(x, y, width, height) {
      this.x = random(50, 950);
      this.y = random(300,500);
      this.width = width;
      this.height = height;

    }
  
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.beginPath();
        ctx.fillRect(0,0,this.width, this.height);
        ctx.closePath();
        ctx.restore();
    }
  
  }
  function random(min, max) {
    return Math.random() * (max - min) + min;
}
  
  