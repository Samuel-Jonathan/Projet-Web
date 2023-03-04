export default class Paddle {
    constructor(x, y, width, height, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
        this.isRightPressed = false;
        this.isLeftPressed = false;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillRect(0,0,this.width, this.height);
        ctx.closePath();
        ctx.restore();
    }

    update(width) {
        if (this.isRightPressed && this.x < width - this.width) {
            this.x += this.speed;
        } else if (this.isLeftPressed && this.x > 0) {
            this.x -= this.speed;
        }
    }

    handleKeyDown(event) {
        if (event.key === "ArrowRight") {
            this.isRightPressed = true;
        } else if (event.key === "ArrowLeft") {
            this.isLeftPressed = true;
        }
    }

    handleKeyUp(event) {
        if (event.key === "ArrowRight") {
            this.isRightPressed = false;
        } else if (event.key === "ArrowLeft") {
            this.isLeftPressed = false;
        }
    }
}