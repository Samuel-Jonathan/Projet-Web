// Importations
import { Player } from "./Player.js";
import { Pipe } from "./Pipe.js";
import { ctx, canvas } from "../Main.js";
import * as assets from "./Assets.js";
import { Vector2 } from "./Vector2.js";
import { Floor, scrollBackground, setBackgroundX } from "./Background.js";
import { gamestates, getCurrentGameStates, setCurrentGameStates, state } from "../GameStates.js";
import { Score } from "./Score.js";

// Joueur
export var player;

// Tuyaux
export var pipes = [];

// Sol
export var floor;

// Score
export var score = 0;

export var isPause = false;


export function initGame() {

	// Réinitialise le jeu
	isPause = false;
	setBackgroundX(0);
	pipes = [];

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

	// Création du score
	score = new Score(ctx, new Vector2(80,80), 0);

	// Pause
	window.addEventListener("keydown", (event) => {
		if (event.code == "Escape" && getCurrentGameStates() != gamestates.MainMenu && 
		getCurrentGameStates() != gamestates.GameOver && 
		getCurrentGameStates() != gamestates.Pause) {
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

	// Crée le score
	createScore();

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

	// Collision du joueur
	player.collision();
}


function createPipes() {
	// Récupère l'image du tuyau
	const pipeImg = assets.pipeImg;
	const pipe2Img = assets.pipe2Img;


	Pipe.generatePipe(ctx, pipes, pipeImg, pipe2Img, 100, 575);

	for (let i = 0; i < pipes.length; i++) {
		// Dessine les tuyaux
		pipes[i].draw();
		// Déplace les tuyaux
		pipes[i].move();
		// Collision du joueur avec les tuyaux
		pipes[i].collision(player.getX(), player.getY(), player.getWidth(), player.getHeight());
	}

}


function createFloor() {
	
	floor.draw();
	floor.regenerateFloor();

}

function createScore(){
	score.draw();
	score.addScore();
}

export function random(min, max) {
	return Math.random() * (max - min) + min;
}

export function setPause(value) {
	isPause = value;
}

