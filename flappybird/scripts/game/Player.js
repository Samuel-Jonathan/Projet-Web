class Player {

    angle = 0;
    gravity = 0.2;

    constructor(img, position, velocity) {
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

    draw(){
        
        drawRotate(this.img, this.position, 75, 55, 0, 0, 169, 124, this.angle);

    }
}


