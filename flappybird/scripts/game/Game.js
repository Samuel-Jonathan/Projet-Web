// Importations
import { Player } from "./Player.js";
import { Pipe } from "./Pipe.js";
import { ctx, canvas } from "../Main.js";
import * as assets from "./Assets.js";
import { Vector2 } from "./Vector2.js";
import { Floor, scrollBackground, setBackgroundX } from "./Background.js";
import { gamestates, getCurrentGameStates, setCurrentGameStates, state } from "../GameStates.js";
import { Score } from "./Score.js";
import { Bonus } from "./Bonus.js";

// Joueur
export var player;

// Tuyaux
export var pipesTop = [];
export var pipesBottom = [];

// Sol
export var floor;

// Score
export var score = 0;

// Bonus
var bonus = []

export var isPause = false;


export function initGame() {

	// Réinitialise le jeu
	isPause = false;
	setBackgroundX(0);
	pipesTop = [];
	pipesBottom = [];
	bonus = [];

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
	score = new Score(ctx, new Vector2(80, 80), 0);

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

	// Récupère les images des bonus
	const invincibilityBonusImg = assets.invincibilityBonusImg;

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

	let spawnInvincibilityBonus = Math.round(random(1,100));

	if(spawnInvincibilityBonus == 1){
	
		bonus.push(new Bonus(ctx, invincibilityBonusImg,
			 new Vector2(random(600,900),700), 
			 new Vector2(-4,-4),
			  new Vector2(random(-3,0),-3,0),51,46));
	}

	for(let i = 0; i < bonus.length; i++){
		bonus[i].draw();
		bonus[i].move();
		bonus[i].collision(bonus, i, player.getX(), player.getY(), player.getWidth(), player.getHeight());
	}

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


	Pipe.generatePipe(ctx, pipesTop, pipesBottom, pipeImg, pipe2Img, 100, 575);

	for (let i = 0; i < pipesTop.length; i++) {
		// Dessine les tuyaux
		pipesTop[i].draw();
		pipesBottom[i].draw();
		// Déplace les tuyaux
		pipesTop[i].move();
		pipesBottom[i].move();
		// Collision du joueur avec les tuyaux
		pipesTop[i].collision(player.getX(), player.getY(), player.getWidth(), player.getHeight());
		pipesBottom[i].collision(player.getX(), player.getY(), player.getWidth(), player.getHeight());
	}

}


function createFloor() {

	floor.draw();
	floor.regenerateFloor();

}

function createScore() {
	score.draw();

	for (let i = score.getValue(); i < pipesTop.length; i++) {

		score.addScore(pipesTop[i].getX(), pipesTop[i].getWidth());

	}

}

export function random(min, max) {
	return Math.random() * (max - min) + min;
}

export function setPause(value) {
	isPause = value;
}

export function setBonus(value){
	bonus = value;
}