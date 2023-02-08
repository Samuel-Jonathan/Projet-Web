import initLoadingScreen from "./loadingScreen/LoadingScreen.js";
import initMainMenu from "./mainMenu/MainMenu.js";
import initGame from "./game/Game.js";


// États du jeu
export const gamestates = {
    LoadingScreen: "loading_screen",
    MainMenu: "main_menu",
    Game: "game"
}

// État du jeu actuel
var currentGamestate = gamestates.LoadingScreen;

export function setCurrentGameStates(gamestate) { currentGamestate = gamestate; }

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

    }
}

state();

