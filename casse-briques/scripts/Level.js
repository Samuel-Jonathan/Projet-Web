import Brick from "./bricks.js";
import {  tabBricks } from "./Gameloop.js";

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



    createBricks() {
        for (let l = 0; l < this.nbcolonebrick; l++) {
            for (let c = 0; c < this.nblinebrick; c++) {
                let x = l * (this.brickWidth + this.spacelinebrick);
                let y = c * (this.brickHeight + this.spacecolonebrick);
                let b = new Brick(x, y, this.brickWidth, this.brickHeight, this.brickColor);
                tabBricks.push(b);
            }
        }
    }
}