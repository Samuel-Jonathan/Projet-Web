import * as assets from "./Assets.js";
import { ctx, canvas } from "../Main.js";
import { gamestates, setCurrentGameStates, state } from "../GameStates.js";

let isHoverGameOver = false;

export function initGameOver() {

    window.requestAnimationFrame(loopGameOver);

    // Évènements
    canvas.addEventListener("mousemove", onMouseOverGameOver);
    canvas.addEventListener("click", onMouseClickGameOver);
}

function loopGameOver() {
console.log('ok');
    // Récupère les images
    const background = assets.gameOverImg;
    const replayButton = assets.replayButtonImg;


    // Affiche l'arrière-plan
    ctx.drawImage(background, canvas.width / 2 - 250,
        canvas.height / 2 - 125, 500, 250);

    // Affiche le bouton pour rejouer
    ctx.drawImage(replayButton, canvas.width / 2 + 135,
        canvas.height / 2 - 80, 60, 60);

        if(!isHoverGameOver){
            window.requestAnimationFrame(loopGameOver);
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



// Évènements du menu principale
function onMouseOverGameOver(e) {

    var pos = getMousePos(canvas, e);

    hoverReplayButton(pos);
}

// Évènement du bouton pour rejouer
function onMouseClickGameOver(e) {

    var pos = getMousePos(canvas, e);

    var x = canvas.width / 2 + 135;
    var y = canvas.height / 2 - 80;
    var width = 60;
    var height = 60;
    clickReplayButton(x, y, width, height, pos);
}

// Évènement du bouton joueur (clic)
function clickReplayButton(x, y, width, height, pos) {

    if (pos.x > x &&
        pos.x < x + width &&
        pos.y > y &&
        pos.y < y + height) {

        canvas.removeEventListener("mousemove", onMouseOverGameOver);
        canvas.removeEventListener("click", onMouseClickGameOver);

        setCurrentGameStates(gamestates.Game);
        state();
    }

}

// Évènement du bouton jouer (survol)
function hoverReplayButton(pos) {

    var replayButton = assets.replayButtonImg;
    var replayButtonHover = assets.replayButtonHoverImg;
    var x = canvas.width / 2 + 135;
    var y = canvas.height / 2 - 80;
    var width = 60;
    var height = 60;
    detectMouseOnGameOver(replayButton, replayButtonHover, x, y, width, height, pos);
}

// Évènement des boutons
function detectMouseOnGameOver(button, buttonHover, x, y, width, height, pos) {

    if (pos.x > x &&
        pos.x < x + width &&
        pos.y > y &&
        pos.y < y + height) {
        // Affiche le bouton (hover)
        ctx.drawImage(buttonHover, x, y, width, height);

        isHoverGameOver = true;
    } else {
        // Affiche le bouton 
        ctx.drawImage(button, x, y, width, height);
        isHoverGameOver = false;
    }
}

