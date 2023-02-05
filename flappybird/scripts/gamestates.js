
// États du jeu
const gamestates = {
    LoadingScreen: "loading_screen",
    MainMenu: "main_menu",
    Game: "game"
}

// État du jeu actuel
var currentGamestates = gamestates.LoadingScreen;

// Changer l'état du jeu
function state() {

    switch (currentGamestates) {
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