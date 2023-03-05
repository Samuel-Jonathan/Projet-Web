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

	// Temps pour les bonus
	timerInvincibilityBonus = 400;


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
		if (this.position.y + this.height - 19 > 644) {
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
			}
		}
	}
}


