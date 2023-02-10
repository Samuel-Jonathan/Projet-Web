export class Pipe{
    constructor(ctx, img, position, width, height){
        this.ctx = ctx;
        this.img = img;
        this.position = position;
        this.width = width; 
        this.height = height;
    }

    draw(){
        this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    move(){
         this.position.x -= 4;
    }

}
