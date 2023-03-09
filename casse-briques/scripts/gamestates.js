// États du jeu 
export const gamestates = {
    Game: "game",
	GameOver: "game_over"
}

// État du jeu actuel
var currentGamestate = gamestates.Game;

// Modifie la gamestate actuelle
export function setCurrentGameStates(gamestate) {
	currentGamestate = gamestate;
}

export function getCurrentGameStates() {
	return currentGamestate;
}