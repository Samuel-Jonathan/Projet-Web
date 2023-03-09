// Importations
import { gameLoop, initGame, resetMusic } from "./Gameloop.js";
import { gameOver } from "./GameOver.js";
import { gamestates, getCurrentGameStates } from "./gamestates.js";


// Récupère le canvas
export const canvas = document.querySelector("#gameCanvas");
// Contexte du canvas
export const ctx = canvas.getContext("2d");


window.onload = init();

function init() {
    
    initGame();
    window.requestAnimationFrame(loop);
}

function loop() {

    switch (getCurrentGameStates()) {
        case gamestates.Game:
            gameLoop();
            break;
        case gamestates.GameOver:
            gameOver();
            break;
    }

    window.requestAnimationFrame(loop);
}