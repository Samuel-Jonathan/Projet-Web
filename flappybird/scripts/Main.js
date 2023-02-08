import { setCurrentGameStates, gamestates, state } from "./GameStates.js";

// Récupère le canvas
export const canvas = document.getElementById("canvas");

// Contexte du canvas
export const ctx = canvas.getContext("2d");


function start(){
    setCurrentGameStates(gamestates.LoadingScreen);
    state();
}

start();