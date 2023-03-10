import { bagCoinImg } from "./Assets.js";
import { setCoins } from "./Game.js";
import { Vector2 } from "./Vector2.js";

export class Coins {

    constructor(ctx, img, position, velocity, acceleration, width, height) {
        this.ctx = ctx;
        this.img = img;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.width = width;
        this.height = height;
    }

    draw() {
        // Affiche les pièces
        this.ctx.drawImage(this.img, this.position.x, this.position.y, 45, 45);
    }


    move() {
        // Déplace les pièces
        this.position = Vector2.sum(this.position, this.velocity);
        this.position = Vector2.sum(this.position, this.acceleration);
    }

    collision(player, coins, i, playerX, playerY, width, height) {
        // Collision avec les pièces
        let leftRightSide = playerX + width / 2 > this.position.x + 25 && playerX - width / 2 < this.position.x + this.width - 25;
        let topBottomSide = playerY + height / 2 > this.position.y + 25 && playerY - height / 2 < this.position.y + this.height - 25;


        if (leftRightSide && topBottomSide) {

            // Supprime le bonus
            delete coins[i];

            coins = coins.filter(function (element) {
                return element !== "";
            });

            setCoins(coins);

            player.addCoins(1);
            

        }


    }
}