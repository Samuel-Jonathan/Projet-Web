import * as assets from "./Assets.js";
import { ctx, canvas } from "../Main.js";
import { gamestates, setCurrentGameStates } from "../GameStates.js";
import { initGame, score } from "./Game.js";

var isHoverGameOver = false;


export function gameOver() {

	if (!isHoverGameOver) {

		// Évènements
		canvas.addEventListener("mousemove", onMouseOverGameOver);
		canvas.addEventListener("click", onMouseClickGameOver);

		// Récupère les images
		const background = assets.gameOverImg;
		const replayButton = assets.replayButtonImg;
		const mainMenuButton = assets.mainMenuButtonImg;


		// Affiche l'arrière-plan
		ctx.drawImage(background, canvas.width / 2 - 250,
			canvas.height / 2 - 125, 500, 250);

		// Affiche le bouton pour rejouer
		ctx.drawImage(replayButton, canvas.width / 2 + 135,
			canvas.height / 2 - 80, 60, 60);

		// Affiche le bouton pour revenir au menu principale
		ctx.drawImage(mainMenuButton, canvas.width / 2 + 135,
			canvas.height / 2 + 20, 60, 60);

		// Affichage du score
		ctx.save();
		ctx.font = '48px Chakra Petch';
		ctx.fillText("Score : " + score.getValue(), 300, 360);
		ctx.restore();
	}
}

// Position x et y de la souris
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}



// Évènements du game over (survol)
function onMouseOverGameOver(e) {

	var pos = getMousePos(canvas, e);

	hoverReplayButton(pos);
	hoverMainMenuButton(pos);
}

// Évènement du game over (clic)
function onMouseClickGameOver(e) {

	var pos = getMousePos(canvas, e);

	clickReplayButton(pos);
	clickMainMenuButton(pos);
}


// Évènement du bouton rejouer (clic)
function clickReplayButton(pos) {

	var x = canvas.width / 2 + 135;
	var y = canvas.height / 2 - 80;
	var width = 60;
	var height = 60;

	if (pos.x > x &&
		pos.x < x + width &&
		pos.y > y &&
		pos.y < y + height) {

		canvas.removeEventListener("mousemove", onMouseOverGameOver);
		canvas.removeEventListener("click", onMouseClickGameOver);

		isHoverGameOver = false;

		initGame();
		setCurrentGameStates(gamestates.Game);
	}

}

// Évènement du bouton pour revenir au menu principale (clic)
function clickMainMenuButton(pos) {

	var x = canvas.width / 2 + 135;
	var y = canvas.height / 2 + 20;
	var width = 60;
	var height = 60;

	if (pos.x > x &&
		pos.x < x + width &&
		pos.y > y &&
		pos.y < y + height) {

		canvas.removeEventListener("mousemove", onMouseOverGameOver);
		canvas.removeEventListener("click", onMouseClickGameOver);

		isHoverGameOver = false;

		initGame();
		setCurrentGameStates(gamestates.MainMenu);
	}

}

// Évènement du bouton rejouer (survol)
function hoverReplayButton(pos) {

	var replayButton = assets.replayButtonImg;
	var replayButtonHover = assets.replayButtonHoverImg;
	var x = canvas.width / 2 + 135;
	var y = canvas.height / 2 - 80;
	var width = 60;
	var height = 60;
	detectMouseOnGameOver(replayButton, replayButtonHover, x, y, width, height, pos);
}


// Évènement du bouton pour revenir au menu principale (survol)
function hoverMainMenuButton(pos) {

	var mainMenuButton = assets.mainMenuButtonImg;
	var mainMenuButtonHover = assets.mainMenuButtonHoverImg;
	var x = canvas.width / 2 + 135;
	var y = canvas.height / 2 + 20;
	var width = 60;
	var height = 60;
	detectMouseOnGameOver(mainMenuButton, mainMenuButtonHover, x, y, width, height, pos);
}

// Évènement des boutons (survol)
function detectMouseOnGameOver(button, buttonHover, x, y, width, height, pos) {
	if (pos.x > x &&
		pos.x < x + width &&
		pos.y > y &&
		pos.y < y + height) {
		// Affiche le bouton (hover)
		ctx.drawImage(buttonHover, x, y, width, height);
		isHoverGameOver = true;

	} else {
		// Affiche le bouton 
		ctx.drawImage(button, x, y, width, height);
	}
}