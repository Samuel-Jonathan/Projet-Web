import { Vector2 } from "./Vector2.js";

export class Floor {

    constructor(ctx, img, position, velocity, width, height) {
        this.ctx = ctx;
        this.img = img;
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
    }

    draw() {
        this.position = Vector2.sum(this.position, this.velocity);
        this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    regenerateFloor() {
        this.ctx.drawImage(this.img, 1000 + this.position.x, this.position.y, this.width, this.height);
        if (this.position.x <= -1000) {
            this.position.x = 0;
        }
    }   
}