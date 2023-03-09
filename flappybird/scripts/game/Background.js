import { Vector2 } from "./Vector2.js";

export var backgroundX = 0;

export function scrollBackground() {
	// Vitesse de défilement de l'arrière-plan
	const VELOCITY_SCROLL_BACKGROUND = 4;
	// Déplace l'arrière-plan
	backgroundX -= VELOCITY_SCROLL_BACKGROUND;
	canvas.style.backgroundPositionX = backgroundX + "px";
}

export function setBackgroundX(value) {
	backgroundX = value;
}




export class Floor {

	constructor(ctx, img, position, velocity, width, height) {
		this.ctx = ctx;
		this.img = img;
		this.position = position;
		this.velocity = velocity;
		this.width = width;
		this.height = height;
	}

	draw() {
		this.position = Vector2.sum(this.position, this.velocity);
		this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
	}

	regenerateFloor() {
		this.ctx.drawImage(this.img, 1000 + this.position.x, this.position.y, this.width, this.height);
		if (this.position.x <= -1000) {
			this.position.x = 0;
		}
	}
}