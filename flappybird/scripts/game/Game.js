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
import { Coins } from "./Coins.js";

// Joueur
export var player;

// Tuyaux
export var pipesTop = [];
export var pipesBottom = [];

// Sol
export var floor;

// Score
export var score;

// Bonus
var bonus = []

// Pièces
var coins = [];

export var isPause = false;


export function initGame() {

	// Réinitialise le jeu
	isPause = false;
	setBackgroundX(0);
	pipesTop = [];
	pipesBottom = [];
	bonus = [];
	Player.hasInvincibilityBonus = false;
	Player.hasX2Bonus = false;

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

	// Efface le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Fait défiler l'arrière-plan
	scrollBackground();

	// Crée les tuyaux
	createPipes();

	// Crée le joueur
	createPlayer();

	// Crée le sol
	createFloor();

	// Crée le score
	createScore();

	// Crée les bonus
	createBonus();

	// Crée les pièces
	createCoins();

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

	player.update();

	// Bonus du joueur
	player.drawBonus(assets.invincibilityBonusImg, assets.x2BonusImg);

	// Pièces du joueur
	player.drawCoins(assets.coinImg);
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

	// Affiche le sol
	floor.draw();
	// Régénère le sol
	floor.regenerateFloor();

}

function createScore() {
	// Affiche le score
	score.draw();

	// Ajouts des points
	for (let i = score.getIndex(); i < pipesTop.length; i++) {

		score.addScore(pipesTop[i].getX(), pipesTop[i].getWidth());
	}

}



function createBonus() {

	// Récupère les images des bonus
	const invincibilityBonusImg = assets.invincibilityBonusImg;
	const x2BonusImg = assets.x2BonusImg;
	const bagCoinsImg = assets.bagCoinImg;

	// Probabilité qu'un bonus d'invincibilité apparaissent
	let spawnInvincibilityBonus = Math.round(random(1, 10));

	// Probabilité qu'un bonus x2 apparaissent
	let spawnX2Bonus = Math.round(random(1, 10));

	// Probabilité qu'un sac de pièces apparaissent
	let spawnBagCoins = Math.round(random(1, 10));


	// Crée le bonus d'invicibilité
	if (spawnInvincibilityBonus == 1) {

		bonus.push(new Bonus("invincibility_bonus", ctx, invincibilityBonusImg,
			new Vector2(random(600, 900), 700),
			new Vector2(-4, -4),
			new Vector2(random(-3, 0), -3, 0), 51, 46));
	}

	if (spawnX2Bonus == 1) {
		bonus.push(new Bonus("x2_bonus", ctx, x2BonusImg,
			new Vector2(random(600, 900), 700),
			new Vector2(-4, -4),
			new Vector2(random(-3, 0), -3, 0), 51, 43));
	}

	if (spawnBagCoins == 1) {
		bonus.push(new Bonus("bag_coins", ctx, bagCoinsImg,
			new Vector2(random(600, 900), 700),
			new Vector2(-4, -4),
			new Vector2(random(-3, 0), -3, 0), 51, 43));
	}



	for (let i = 0; i < bonus.length; i++) {
		// Dessine les bonus
		bonus[i].draw();
		// Déplace les bonus
		bonus[i].move();
		// Collision des bonus
		bonus[i].collision(bonus, i, player.getX(), player.getY(), player.getWidth(), player.getHeight(), player);
	}
}

function createCoins() {

	// Récupère l'image pour les pièces
	const coinsImg = assets.coinImg;

	// Probabilité qu'une pièce apparaissent
	let spawnCoins = Math.round(random(1, 10));


	// Crée une pièce
	if (spawnCoins == 1) {
		coins.push(new Coins(ctx, coinsImg,
			new Vector2(random(600, 900), 700),
			new Vector2(-4, -4),
			new Vector2(random(-3, 0), -3, 0), 51, 46));
	}

	for (let i = 0; i < coins.length; i++) {
		// Dessine les pièces
		coins[i].draw();
		// Déplace les pièces
		coins[i].move();
		// Collision des pièces
		coins[i].collision(player, coins, i, player.getX(), player.getY(), player.getWidth(), player.getHeight());
	}
}

export function random(min, max) {
	return Math.random() * (max - min) + min;
}

export function setPause(value) {
	isPause = value;
}

export function setBonus(value) {
	bonus = value;
}

export function setCoins(value){
	coins = value;
}