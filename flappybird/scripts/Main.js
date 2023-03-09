// Importations
import { game, initGame } from "./game/Game.js";
import { gameOver } from "./game/GameOver.js";
import { gamestates, getCurrentGameStates } from "./GameStates.js";
import { loadingScreen } from "./loadingScreen/LoadingScreen.js";
import mainMenu from "./mainMenu/MainMenu.js";
import { pause } from "./game/Pause.js";

// Récupère le canvas
export const canvas = document.getElementById("canvas");

// Contexte du canvas
export const ctx = canvas.getContext("2d");


window.onload = init();

function init() {
	initGame();
	window.requestAnimationFrame(loop);
}

function loop() {

	switch (getCurrentGameStates()) {
		case gamestates.LoadingScreen:
			loadingScreen();
			break;
		case gamestates.MainMenu:
			mainMenu();
			break;
		case gamestates.Game:
			game();
			break;
		case gamestates.GameOver:
			gameOver();
			break;
		case gamestates.Pause:
			pause();
			break;
	}




	window.requestAnimationFrame(loop);
}


