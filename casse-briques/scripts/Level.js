import Brick from "./bricks.js";
import { random, tabBricks } from "./Gameloop.js";

export class Level {

    constructor(nbcolonebrick, nblinebrick, spacelinebrick, spacecolonebrick, brickWidth, brickHeight, brickColor) {
        this.nbcolonebrick = nbcolonebrick;
        this.nblinebrick = nblinebrick;
        this.spacelinebrick = spacelinebrick;
        this.spacecolonebrick = spacecolonebrick;
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this.brickColor = brickColor;
    }



    createBricks(durability) {
        for (let l = 0; l < this.nbcolonebrick; l++) {
            for (let c = 0; c < this.nblinebrick; c++) {
                let x = l * (this.brickWidth + this.spacelinebrick);
                let y = c * (this.brickHeight + this.spacecolonebrick);
                if (durability != 0) {
                    let hasDurability = Math.round(random(1, durability));


                    if (hasDurability == 1) {
                        let nbDurability = Math.round(random(2, 3));

                        if (nbDurability == 2) {

                            this.brickColor = "red";
                        } else {

                            this.brickColor = "blue";
                        }

                        var b = new Brick(x, 50 + y, this.brickWidth, this.brickHeight, this.brickColor, nbDurability);
                    } else {
                        this.brickColor = "#ff4af6";
                        var b = new Brick(x, 50 + y, this.brickWidth, this.brickHeight, this.brickColor, 1);
                    }
                } else {
                    this.brickColor = "#ff4af6";
                    var b = new Brick(x, 50 + y, this.brickWidth, this.brickHeight, this.brickColor, 1);
                }

                tabBricks.push(b);
            }
        }
    }
}