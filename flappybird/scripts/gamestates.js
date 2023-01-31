const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gamestates = {
    LoadingScreen: "loading_screen",
    MainMenu: "main_menu"
}

var currentGamestates = gamestates.LoadingScreen;

function state() {

    switch (currentGamestates) {
        case gamestates.LoadingScreen:
            initLoadingScreen();
            break;

        case gamestates.MainMenu:
            initMainMenu();
            break;
    }
}

state();