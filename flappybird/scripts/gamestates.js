// Importations
import initLoadingScreen from "./loadingScreen/LoadingScreen.js";
import initMainMenu from "./mainMenu/MainMenu.js";
import { initGame, isPause } from "./game/Game.js";
import { pause, resume } from "./game/Pause.js";
import { initGameOver } from "./game/GameOver.js";


// États du jeu 
export const gamestates = {
	LoadingScreen: "loading_screen",
	MainMenu: "main_menu",
	Game: "game",
	Pause: "pause",
	GameOver: "game_over"
}

// État du jeu actuel
var currentGamestate = gamestates.LoadingScreen;

// Modifie la gamestate actuelle
export function setCurrentGameStates(gamestate) {
	currentGamestate = gamestate;
}

export function getCurrentGameStates() {
	return currentGamestate;
}

// Changer l'état du jeu
export function state() {

	switch (currentGamestate) {
		// Écran de chargement
		case gamestates.LoadingScreen:
			initLoadingScreen();
			break;

			//Menu principale
		case gamestates.MainMenu:
			initMainMenu();
			break;

		case gamestates.Game:
			initGame();
			break;
			//Pause
		case gamestates.Pause:

			let runPause = (!isPause) ? pause() : resume();
			break;
			//Game Over    
		case gamestates.GameOver:
			let runGameOver = pause();
			initGameOver();
			break;

	}
}