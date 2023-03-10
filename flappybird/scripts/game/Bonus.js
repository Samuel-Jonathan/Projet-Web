import { setBonus } from "./Game.js";
import { Vector2 } from "./Vector2.js";
import { Player } from "./Player.js";


export class Bonus {

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

    collision(bonus, i, playerX, playerY, width, height, player) {
        // Collision avec le bonus
        let leftRightSide = playerX + width / 2 > this.position.x + 25 && playerX - width / 2 < this.position.x + this.width - 25;
        let topBottomSide = playerY + height / 2 > this.position.y + 25 && playerY - height / 2 < this.position.y + this.height - 25;


        if (leftRightSide && topBottomSide) {

            switch (this.name) {
                case "invincibility_bonus":
                    player.setInvincibilityBonus(360);

                    // Supprime le bonus
                    const index = bonus.indexOf(bonus[i]);
 
                    bonus.splice(index, 1);

                    setBonus(bonus);
                    Player.hasInvincibilityBonus = true;
                    break;
                case "x2_bonus":
                    player.setX2Bonus(360);

                    // Supprime le bonus
                    const index2 = bonus.indexOf(bonus[i]);
 
                    bonus.splice(index2, 1);

                    setBonus(bonus);

                    Player.hasX2Bonus = true;
                    break;
                case "bag_coins":

                    // Supprime le bonus
                    const index3 = bonus.indexOf(bonus[i]);
 
                    bonus.splice(index3, 1);

                    setBonus(bonus);

                    player.addCoins(10);
                    break;
            }

        }

    }

}

