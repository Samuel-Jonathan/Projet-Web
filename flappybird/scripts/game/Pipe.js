export class Pipe {
    constructor(ctx, img, position, width, height) {
        this.ctx = ctx;
        this.img = img;
        this.position = position;
        this.width = width;
        this.height = height;
    }

    // Dessine les tuyaux
    draw() {
        this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    // Déplace les tuyaux
    move() {
        this.position.x -= 4;
    }

    // Collision du joueur avec les tuyaux
    collision(playerX, playerY) {
        if (playerX > this.position.x && playerX < this.position.x + this.width
            && playerY > this.position.y && playerY < this.position.y + this.height) {
            console.log('ok');
        }
    }

}
