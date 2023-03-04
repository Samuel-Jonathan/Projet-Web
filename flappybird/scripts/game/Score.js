export class Score {

    delay = 5;

    constructor(ctx, position, value) {
        this.ctx = ctx;
        this.position = position;
        this.value = value;
    }

    draw() {
        this.ctx.font = '48px consolas';
        this.ctx.fillText(this.value, 10, 50);
    }

    addScore() {
        this.delay--;
        
        console.log(this.delay);
        if (this.delay < 0) {
            this.value++;
            this.delay = 5;
        }
    }
}