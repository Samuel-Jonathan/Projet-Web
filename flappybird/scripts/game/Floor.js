export class Floor {

    moveFloor = 0;

    constructor(ctx, img, x, y, width, height) {
        this.ctx = ctx;
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        this.moveFloor -= 4;
        this.ctx.drawImage(this.img, this.moveFloor, this.y, this.width, this.height);
    }

    regenerateFloor() {
        this.ctx.drawImage(this.img, 1000 + this.moveFloor, this.y, this.width, this.height);
        if (this.moveFloor <= -1000) {
            this.moveFloor = 0;
        }
    }
}