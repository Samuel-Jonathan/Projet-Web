import { random } from "./Game.js";
import { Vector2 } from "./Vector2.js";

export class Pipe {

    
    static xPipe = 1000;
    static yPipe = 0;
    static generatePipeTime = 0;

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

    static generatePipe(ctx, pipe, pipeImg, pipe2Img,width, height) {

        let xPipe = Pipe.xPipe;
        let yPipe = Pipe.yPipe;

        // Hauteur des tuyaux
        Pipe.yPipe = (random(500, 200)) * -1;
  
        // Création des tuyaux
        pipe[pipe.length] = new Pipe(ctx, pipeImg, new Vector2(xPipe, yPipe), width, height);
        pipe[pipe.length] = new Pipe(ctx, pipe2Img, new Vector2(xPipe, yPipe + height + 180), 
        width, height);

        // Écart entre chaque tuyaux
        xPipe += random(200, 300);

        Pipe.generatePipeTime = 0;
    }
}