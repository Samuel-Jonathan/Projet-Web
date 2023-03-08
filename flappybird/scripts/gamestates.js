// Importations
import initMainMenu from "./mainMenu/MainMenu.js";
import { initGame, isPause } from "./game/Game.js";
import { pause, resume } from "./game/Pause.js";


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

