import { gamestates, setCurrentGameStates, state } from "../GameStates.js";
import { setBackgroundX } from "./Background.js";
import { pipes, random } from "./Game.js";
import { Vector2 } from "./Vector2.js";


export class Pipe {


	static xPipe = 1000;
	static yPipe = 0;
	static generatePipeTime = 0;
	static nbPipesRemove = 0;


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
	collision(playerX, playerY, ctx) {
		let leftSide = playerX > this.position.x && playerX < this.position.x + this.width;
		let rightSide = playerY > this.position.y && playerY < this.position.y + this.height;
		if (leftSide && rightSide) {

			setCurrentGameStates(gamestates.GameOver);
			state();
			/*setBackgroundX(0);
			// Efface le canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);*/


		}
	}

	remove() {
		if (this.position.x + this.width < 0) {
			Pipe.nbPipesRemove++;
		}
	}

	static generatePipe(ctx, pipes, pipeImg, pipe2Img, width, height) {

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
			pipes[pipes.length] = new Pipe(ctx, pipes.length, pipeImg, new Vector2(xPipe, yPipe), new Vector2(-4, 0), width, height);
			pipes[pipes.length] = new Pipe(ctx, pipes.length, pipe2Img, new Vector2(xPipe, yPipe + height + 180), new Vector2(-4, 0),
				width, height);

			// Écart entre chaque tuyaux
			xPipe += random(200, 300);

			Pipe.generatePipeTime = 0;
		}
	}
}