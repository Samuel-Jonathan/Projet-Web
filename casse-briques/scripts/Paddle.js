export default class Paddle {

    hasPaddleBonus = false;
    hasSpeedMalus = false;
    hasStrengthBonus = false;

    timerPaddleBonus = 360;
    timerSpeedMalus = 360;
    timerStrengthBonus = 180;

    constructor(img, x, y, width, height, speed) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.isRightPressed = false;
        this.isLeftPressed = false;
    }

    draw(ctx) {
        if (!this.hasPaddleBonus) {
            ctx.drawImage(this.img, this.x, this.y);
        } else {
            this.width = 200;
            this.height = 15;
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

    }

    update(width, ball) {
        if (this.isRightPressed && this.x < width - this.width) {
            this.x += this.speed;
        } else if (this.isLeftPressed && this.x > 0) {
            this.x -= this.speed;
        }

        this.bonusMalusTimer(ball);
    }

    bonusMalusTimer(ball) {
        // Bonus de raquette
        if (this.hasPaddleBonus) {
            this.timerPaddleBonus--;
            if (this.timerPaddleBonus < 0) {
                this.hasPaddleBonus = false;
                this.timerPaddleBonus = 360;
                this.width = 75;
                this.height = 15;
            }
        }

        // Malus de vitesse
        if (this.hasSpeedMalus) {

            this.timerSpeedMalus--;
            if (this.timerSpeedMalus < 0) {
                ball.dx /= 1.6;
                ball.dy /= 1.6;
                this.hasSpeedMalus = false;
                this.timerSpeedMalus = 180;
            }
        }

        // Bonus de force
        if (this.hasStrengthBonus) {

            this.timerStrengthBonus--;
            if (this.timerStrengthBonus < 0) {
                this.hasStrengthBonus = false;
                this.timerStrengthBonus = 180;
            }

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