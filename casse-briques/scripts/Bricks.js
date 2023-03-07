export default class Brick {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        
    }

    update(ball) {
        if (ball.x + ball.size > this.x && ball.x < this.x + this.width && ball.y + ball.size > this.y && ball.y < this.y + this.height) {
          ball.dy = -ball.dy;
          return true;
        }
        return false;
      }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    }


    
}   