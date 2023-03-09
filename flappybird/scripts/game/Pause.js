import { initGame, setPause } from "./Game.js";
import * as assets from "./Assets.js";
import { ctx, canvas } from "../Main.js";
import { gamestates, setCurrentGameStates } from "../GameStates.js";

var isHoverPause = false;

export function resume() {
	//Lance le jeu
	setPause(false);
	setCurrentGameStates(gamestates.Game);
}

export function pause() {

	if (!isHoverPause) {
		setPause(true);

		let pauseImg = assets.pauseImg;
		let playButtonImg = assets.playButtonImg;
		let exitButtonImg = assets.exitButtonImg;

		// Affiche l'arrière-plan 
		ctx.drawImage(pauseImg, canvas.width / 2 - 600 / 2,
			canvas.height / 2 - 288 / 2, 600, 288);

		// Affiche le bouton pour lancer le jeu
		ctx.drawImage(playButtonImg, canvas.width / 2 - 120,
			canvas.height / 2 - 45 / 2, 107, 45);

		// Affiche le bouton pour quitter le jeu
		ctx.drawImage(exitButtonImg, canvas.width / 2 + 20,
			canvas.height / 2 - exitButtonImg.height / 2);

		// Évènements
		canvas.addEventListener("mousemove", onMouseOverPause);
		canvas.addEventListener("click", onMouseClickPause);
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

// Évènements du menu de pause (survol)
function onMouseOverPause(e) {
	var pos = getMousePos(canvas, e);

	hoverPlayButton(pos);
	hoverExitButton(pos);
}

// Évènement du bouton pour lancer le jeu (survol)
function hoverPlayButton(pos) {

	var playButtonImg = assets.playButtonImg;
	var playButtonHoverImg = assets.playButtonHoverImg;
	var x = canvas.width / 2 - 120;
	var y = canvas.height / 2 - 45 / 2;
	var width = 107;
	var height = 45;
	detectMouseOnGameOver(playButtonImg, playButtonHoverImg, x, y, width, height, pos);
}

// Évènement du bouton pour quitter le jeu (survol)
function hoverExitButton(pos) {

	var exitButtonImg = assets.exitButtonImg;
	var exitButtonHoverImg = assets.exitButtonHoverImg;
	var x = canvas.width / 2 + 20;
	var y = canvas.height / 2 - exitButtonImg.height / 2;
	var width = exitButtonImg.width;
	var height = exitButtonImg.height;
	detectMouseOnGameOver(exitButtonImg, exitButtonHoverImg, x, y, width, height, pos);
}

// Évènement des boutons (survol)
function detectMouseOnGameOver(button, buttonHover, x, y, width, height, pos) {

	if (pos.x > x &&
		pos.x < x + width &&
		pos.y > y &&
		pos.y < y + height) {
		// Affiche le bouton (hover)
		ctx.drawImage(buttonHover, x, y, width, height);
		isHoverPause = true;

	} else {
		// Affiche le bouton 
		ctx.drawImage(button, x, y, width, height);
	}
}


// Évènement du menu de pause (clic)
function onMouseClickPause(e) {

	var pos = getMousePos(canvas, e);

	clickPlayButton(pos);
	clickExitButton(pos);
}

// Évènement du bouton pour lancer le jeu (clic)
function clickPlayButton(pos) {

	var x = canvas.width / 2 - 120;
	var y = canvas.height / 2 - 45 / 2;
	var width = 107;
	var height = 45;

	if (pos.x > x &&
		pos.x < x + width &&
		pos.y > y &&
		pos.y < y + height) {
		isHoverPause = false;
		canvas.removeEventListener("mousemove", onMouseOverPause);
		canvas.removeEventListener("click", onMouseClickPause);

		resume();
	}

}

// Évènement du bouton pour quitter le jeu (clic)
function clickExitButton(pos) {

	var exitButtonImg = assets.exitButtonImg;

	var x = canvas.width / 2 + 20;
	var y = canvas.height / 2 - exitButtonImg.height / 2;
	var width = exitButtonImg.width;
	var height = exitButtonImg.height;

	if (pos.x > x &&
		pos.x < x + width &&
		pos.y > y &&
		pos.y < y + height) {

		isHoverPause = false;
		canvas.removeEventListener("mousemove", onMouseOverPause);
		canvas.removeEventListener("click", onMouseClickPause);
		
		initGame();
		setCurrentGameStates(gamestates.MainMenu);
	}

}
