import { circRectsOverlap } from "./Collisions.js";
import { init } from "./gameloop.js";

export default class Ball {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getRadius() {
        return this.radius;
    }



    update(width, height) {
        this.x += this.dx;
        this.y += this.dy;
        this.handleCanvasCollision(width, height);
    }

    handleCanvasCollision(width, height) {
        if (this.x + this.dx > width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > height - this.radius) {

             if (this.y + this.dy >= height - this.radius) {
                // Si la balle touche le bas du canvas
                // Relancer le jeu
                init();

            }
        }
    }
}