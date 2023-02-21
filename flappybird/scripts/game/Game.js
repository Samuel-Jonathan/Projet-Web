// Importations
import { Player } from "./Player.js";
import { Pipe } from "./Pipe.js";
import { ctx, canvas } from "../Main.js";
import * as assets from "./Assets.js";
import { Vector2 } from "./Vector2.js";
import { Floor } from "./Floor.js";
import { gamestates, setCurrentGameStates, state } from "../Gamestates.js";

// Joueur
export var player;

// Tuyaux
export var pipes = [];

// Sol
export var floor;

export var moveBackground = 0;

export var isPause = false;


export function initGame() {

	// Arrière-plan du canvas
	canvas.style.background = 'url(/flappybird/assets/game/background.png)';

	// Récupère l'image du joueur
	const playerImg = assets.playerImg;

	// Efface le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Crée le joueur
	player = new Player(ctx, playerImg,
		new Vector2(canvas.width / 2, canvas.height / 2),
		new Vector2(0, 2), 75, 55, 0, 0);

	// Création du sol
	floor = new Floor(ctx, assets.floorImg, new Vector2(0, 644), new Vector2(-4, 0), 1000, 56);

	window.addEventListener("keydown", (event) => {
		if (event.code == "Escape") {
			setCurrentGameStates(gamestates.Pause);
			state();
		}
	});

	requestAnimationFrame(loopGame);
}


export function loopGame() {

	// Efface le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Fait défiler l'arrière-plan
	scrollBackground();
	// Crée le joueur
	createPlayer();
	// Crée les tuyaux
	createPipes();
	// Crée le sol
	createFloor();

	if (!isPause) {
		requestAnimationFrame(loopGame);
	}

}

function createPlayer() {
	// Applique la gravité au joueur
	player.applyGravity();

	// Dessine le joueur
	player.draw();
	// Animation du joueur
	player.animation();

	// Saut du joueur
	player.jump();

	// Évènements du joueur
	player.events();
}

function scrollBackground() {
	// Vitesse de défilement de l'arrière-plan
	const VELOCITY_SCROLL_BACKGROUND = 4;
	// Déplace l'arrière-plan
	moveBackground -= VELOCITY_SCROLL_BACKGROUND;
	canvas.style.backgroundPositionX = moveBackground + "px";
}


function createPipes() {
	// Récupère l'image du tuyau
	const pipeImg = assets.pipeImg;
	const pipe2Img = assets.pipe2Img;


	Pipe.generatePipe(ctx, pipes, pipeImg, pipe2Img, 100, 575);

	for (let i = Pipe.nbPipesRemove; i < pipes.length; i++) {
		// Dessine les tuyaux
		pipes[i].draw();
		// Déplace les tuyaux
		pipes[i].move();
		// Collision du joueur avec les tuyaux
		pipes[i].collision(player.getX(), player.getY());
		//Supprime les tuyaux
		pipes[i].remove();
	}

}


function createFloor() {

	floor.draw();
	floor.regenerateFloor();

}

export function random(min, max) {
	return Math.random() * (max - min) + min;
}

export function setPause(value) {
	isPause = value;
}

