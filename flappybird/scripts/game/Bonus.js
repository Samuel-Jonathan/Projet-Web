export class Bonus {
    constructor(ctx, img, position, velocity) {
        this.ctx = ctx;
        this.img = img;
        this.position = position;
        this.velocity = velocity;
    }

    draw() {
        // Affiche le bonus
        this.ctx.drawImage(this.img, this.position.x,this.position.y);
    }

    move(){
        // Déplace le bonus
        this.position.x -= 6;
        
    }
}