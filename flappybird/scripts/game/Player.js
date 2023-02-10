// Importations
import { drawRotate } from "./Sprite.js";
import { Vector2 } from "./Vector2.js";


export class Player {

    // Gravité appliquée au joueur
    gravity = 0.3;

    // Temps pour les animations
    fallAnimationTime = 0;
    flyAnimationTime = 0;

    isJumping = false;
    jumpTime = 0;

    constructor(ctx, img, position, velocity, width, height, offsetX, offsetY, offsetWidth, offsetHeight, angle) {
        this.ctx = ctx;
        this.img = img;
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.offsetWidth = offsetWidth;
        this.offsetHeight = offsetHeight;
        this.angle = angle;
    }

    // Saut 
    jump() {

        const ANGLE_JUMP = -30;

        this.isJumping = true;

        this.jumpTime = 0;
        this.fallAnimationTime = 0;

        this.angle = ANGLE_JUMP;
    }

    // Gravité
    applyGravity() {

        const FALL_ANIMATION_TIME_MAX = 40;
        const ANGLE_MAX = 90;
        const VELOCITY_ROTATION = 6;

        this.velocity.addY(this.gravity);

        this.position = Vector2.sum(this.position, this.velocity);

        this.fallAnimationTime++;


        if (this.fallAnimationTime > FALL_ANIMATION_TIME_MAX) {
            if (this.angle < ANGLE_MAX) {
                this.angle += VELOCITY_ROTATION;
            }
        }

        if (this.angle == ANGLE_MAX) {
            this.offsetX = 170;
        }

    }

    // Dessine le joueur
    draw() {

        drawRotate(this.ctx, this.img, this.position, 75, 55, this.offsetX, 0, 169, 124, this.angle);

    }

    // Animation du joueur
    animation() {

        const LAST_SPRITE = 340;
        const NEXT_SPRITE = 170;
        const DELAY_BETWEEN_SPRITE = 7;

        this.flyAnimationTime++;

        if (this.offsetX >= LAST_SPRITE) {
            this.offsetX = 0;
        } else if (this.flyAnimationTime >= DELAY_BETWEEN_SPRITE) {
            this.offsetX += NEXT_SPRITE;
            this.flyAnimationTime = 0;
        }
    }

    update() {

        const JUMP_TIME_MAX = 9;
        const VELOCITY_JUMP = -4.5;

        if (this.isJumping) {
            this.offsetX = 340;
            this.jumpTime++;
            this.velocity.setY(VELOCITY_JUMP);
            this.position = Vector2.sum(this.position, this.velocity);
        }

        if (this.jumpTime >= JUMP_TIME_MAX) {
            this.isJumping = false;
        }
    }
}
