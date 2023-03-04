import { circRectsOverlap } from "./collisions.js";

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
  
    /*collision(ctx,ballX,ballY,ballRadius){
      if (circRectsOverlap(this.x, this.y, this.width, this.height, ballX, ballY, ballRadius)) {
        ctx.clearRect(0,0,this.width, this.height);
        return true;
      }
      return false;
    }
    */
    collision(ball) {
      if (ball.x + ball.size > this.x && ball.x < this.x + this.width && ball.y + ball.size > this.y && ball.y < this.y + this.height) {
        ctx.clearRect(this.x,this.y,this.width, this.height);
        return true;
      }
      return false;
    }

  }
  function random(min, max) {
    return Math.random() * (max - min) + min;
}
  
  