import { gamestates, setCurrentGameStates } from "../GameStates.js";
import { random } from "./Game.js";
import { Player } from "./Player.js";
import { Vector2 } from "./Vector2.js";


export class Pipe {


	static xPipe = 1000;
	static yPipe = 0;
	static generatePipeTime = 0;

	constructor(ctx, id, img, position, velocity, width, height) {
		this.ctx = ctx;
		this.id = id;
		this.img = img;
		this.position = position;
		this.velocity = velocity;
		this.width = width;
		this.height = height;
	}

	// Dessine les tuyaux
	draw() {

		this.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
	}

	// Déplace les tuyaux
	move() {
		this.position = Vector2.sum(this.position, this.velocity);
	}

	// Collision du joueur avec les tuyaux
	collision(playerX, playerY, width, height) {

		let leftRightSide = playerX + width / 2 > this.position.x && playerX - width / 2 < this.position.x + this.width;
		let topBottomSide = playerY + height / 2 > this.position.y && playerY - height / 2 < this.position.y + this.height;
		if (leftRightSide && topBottomSide && !Player.hasInvincibilityBonus) {
			setCurrentGameStates(gamestates.GameOver);

		}
	}

	getX() {
		return this.position.x;
	}

	getWidth() {
		return this.width;
	}


	static generatePipe(ctx, pipesTop, pipesBottom, pipeImg, pipe2Img, width, height) {

		// Délai pour la génération des tuyaux
		const generatePipeTimeMax = random(80, 120);

		Pipe.generatePipeTime++;

		// Crée un tuyau
		if (Pipe.generatePipeTime >= generatePipeTimeMax) {

			let xPipe = Pipe.xPipe;
			let yPipe = Pipe.yPipe;

			// Hauteur des tuyaux
			yPipe = (random(500, 200)) * -1;

			// Création des tuyaux
			pipesTop[pipesTop.length] = new Pipe(ctx, pipesTop.length, pipeImg, new Vector2(xPipe, yPipe), new Vector2(-4, 0), width, height);
			pipesBottom[pipesBottom.length] = new Pipe(ctx, pipesBottom.length, pipe2Img, new Vector2(xPipe, yPipe + height + 180), new Vector2(-4, 0),
				width, height);

			// Écart entre chaque tuyaux
			xPipe += random(200, 300);

			Pipe.generatePipeTime = 0;
		}
	}
}