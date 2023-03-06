// Importations
import { drawRotate } from "./Sprite.js";
import { Vector2 } from "./Vector2.js";
import { gamestates, setCurrentGameStates, state } from "../GameStates.js";




export class Player {

	// Gravité appliquée au joueur
	gravity = 0.3;
	angle = 0;

	frames = [0, 170, 340];

	// Temps pour les animations
	fallDelay = 0;
	frameDelay = 0;
	jumpDelay = 0;

	isJumping = false;

	static hasInvincibilityBonus = false;
	static hasX2Bonus = false;

	// Temps pour les bonus
	timerInvincibilityBonus = 360;
	timerX2Bonus = 360;

	coins = 0;

	constructor(ctx, img, position, velocity, width, height, offsetX, offsetY) {
		this.ctx = ctx;
		this.img = img;
		this.position = position;
		this.velocity = velocity;
		this.width = width;
		this.height = height;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}

	events() {

		// Saut du joueur
		window.addEventListener("keydown", (event) => {
			if (event.code == "Space") {
				this.isJumping = true;
				this.fallDelay = 0;
				this.angle = -30;
			}
		});
	}

	// Saut 
	jump() {

		if (this.isJumping) {
			this.offsetX = this.frames[2];
			this.velocity.y = -4.2;
			this.position = Vector2.sum(this.position, this.velocity);
			this.jumpDelay++;
		}
		if (this.jumpDelay == 8) {
			this.isJumping = false;
			this.jumpDelay = 0;
		}
	}

	// Gravité
	applyGravity() {

		this.velocity.y += this.gravity;

		this.position = Vector2.sum(this.position, this.velocity);

		this.fallDelay++;

		if (this.fallDelay > 40) {
			this.angle += (this.angle < 90) ? 6 : 0;
		}

		this.offsetX = (this.angle == 90) ? this.frames[1] : this.offsetX;

	}

	// Dessine le joueur
	draw() {

		drawRotate(this.ctx, this.img, this.position, 75, 55, this.offsetX, 0, 169, 124, this.angle);

	}

	// Animation du joueur
	animation() {

		let nextFrame = this.frameDelay >= 7;
		let firstFrame = this.offsetX >= this.frames[2];

		this.frameDelay++;

		if (nextFrame) {
			this.offsetX += this.frames[1];
			this.frameDelay = 0;
		}

		this.offsetX = (firstFrame) ? this.frames[0] : this.offsetX;

	}

	getX() {
		return this.position.x;
	}

	getY() {
		return this.position.y;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}

	collision() {

		// Collision du joueur avec le sol
		if (this.position.y + this.height - 19 > 644 && !Player.hasInvincibilityBonus) {
			setCurrentGameStates(gamestates.GameOver);
			state();
		}
	}

	update() {
		// Temps pour le bonus d'invincibilité
		if (Player.hasInvincibilityBonus) {
			this.timerInvincibilityBonus--;
			if (this.timerInvincibilityBonus < 0) {
				Player.hasInvincibilityBonus = false;
				this.timerInvincibilityBonus = 360;
			}
		}

		// Temps pour le bonus x2
		if (Player.hasX2Bonus) {
			this.timerX2Bonus--;
			if (this.timerX2Bonus < 0) {
				Player.hasX2Bonus = false;
				this.timerX2Bonus = 360;
			}
		}
	}

	setInvincibilityBonus(value) {
		this.timerInvincibilityBonus = value;
	}

	setX2Bonus(value) {
		this.timerX2Bonus = value;
	}

	drawBonus(invincibilityBonusImg, x2BonusImg) {

		if (Player.hasInvincibilityBonus) {

			// Affiche le bonus
			this.ctx.drawImage(invincibilityBonusImg, 10, 100);
			this.ctx.save();
			this.ctx.font = '40px Chakra Petch';
			this.ctx.fillText(Math.round(this.timerInvincibilityBonus / 60) + "s", 70, 140);
			this.ctx.restore();
		}

		if (Player.hasX2Bonus) {
			// Affiche le bonus
			this.ctx.drawImage(x2BonusImg, 10, 200);
			this.ctx.save();
			this.ctx.font = '40px Chakra Petch';
			this.ctx.fillText(Math.round(this.timerX2Bonus / 60) + "s", 70, 240);
			this.ctx.restore();
		}
	}

	drawCoins(coinsImg) {
		// Affiche les pièces
		this.ctx.drawImage(coinsImg, 840, 10,50,50);
		this.ctx.save();
		this.ctx.font = '40px Chakra Petch';
		this.ctx.fillText("x" + this.coins, 900, 50);
		this.ctx.restore();

	}

	addCoins(value) {
		this.coins += value;
	}

}


