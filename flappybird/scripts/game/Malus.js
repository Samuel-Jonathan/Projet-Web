import { setBonus } from "./Game.js";
import { Vector2 } from "./Vector2.js";
import { Player } from "./Player.js";
import { gamestates, setCurrentGameStates } from "../GameStates.js";

export class Malus {

    constructor(name, ctx, img, position, velocity, acceleration, width, height) {
        this.name = name;
        this.ctx = ctx;
        this.img = img;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.width = width;
        this.height = height;
    }

    draw() {
        // Affiche le bonus
        this.ctx.drawImage(this.img, this.position.x, this.position.y);
    }

    move() {
        // Déplace le bonus
        this.position = Vector2.sum(this.position, this.velocity);
        this.position = Vector2.sum(this.position, this.acceleration);
    }

    collision(malus, i, playerX, playerY, width, height, player) {
        // Collision avec le malus
        let leftRightSide = playerX + width / 2 > this.position.x + 25 && playerX - width / 2 < this.position.x + this.width - 25;
        let topBottomSide = playerY + height / 2 > this.position.y + 25 && playerY - height / 2 < this.position.y + this.height - 25;


        if (leftRightSide && topBottomSide) {

            switch (this.name) {
                case "bomb_malus":

                    // Supprime le malus
                    const index = malus.indexOf(malus[i]);

                    malus.splice(index, 1);

                    setCurrentGameStates(gamestates.GameOver);

                    break;
            }

        }

    }

}

