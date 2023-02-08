import { drawRotate } from "./Sprite.js";
import { Vector2 } from "./Vector2.js";


export class Player {

    angle = 0;
    gravity = 0.2;

    constructor(ctx, img, position, velocity) {
        this.ctx = ctx;
        this.img = img;
        this.position = position;
        this.velocity = velocity;

    }

    jump() {

        this.position.addY(-50);
        this.velocity.setY(0);
        this.angle = -20;

    }

    applyGravity() {

        this.velocity.addY(this.gravity);

        this.position = Vector2.sum(this.position, this.velocity);

        if (this.angle < 90) {
            this.angle += 4;
        }

    }

    draw() {

        drawRotate(this.ctx, this.img, this.position, 75, 55, 0, 0, 169, 124, this.angle);

    }
}


