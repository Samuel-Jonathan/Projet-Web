class Player {

    angle = 0;

    constructor(img, position, velocity) {
        this.img = img;
        this.position = position;
        this.velocity = velocity;

    }

    applyGravity() {

        var gravity = 0.2;

        this.velocity.addY(gravity);

        this.position = Vector2.sum(this.position, this.velocity);

        if (this.angle < 90) {
            this.angle += 4;
        }

        drawRotate(this.img, this.position, 75, 55, 0, 0, 169, 124, this.angle);


    }
}


