import * as assets from "./Assets.js";
import { setCurrentGameStates, gamestates } from "./gamestates.js";
import { setPause } from "./Gameloop.js";

let isHoverGameOver = false;

export function gameOver() {

    // Arrière-plan
    ctx.save();
    ctx.fillStyle = "#161616";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Affiche le game over
    ctx.drawImage(assets.gameOverImg, 330, 220);

    if (!isHoverGameOver) {

        // Bouton pour rejouer
        ctx.drawImage(assets.replayButtonImg, 550, 500);

        // Évènements
        canvas.addEventListener("mousemove", onMouseOverGameOver);
        canvas.addEventListener("click", onMouseClickGameOver);
    } else {
        // Affiche le bouton (hover)
        ctx.drawImage(assets.replayButtonHoverImg, 550, 500);

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

function onMouseOverGameOver(e) {
    var pos = getMousePos(canvas, e);
    hoverReplayButton(pos);
}

function onMouseClickGameOver(e) {

    var pos = getMousePos(canvas, e);

    var replayButton = assets.replayButtonImg;
    var x = 550;
    var y = 500;
    var width = replayButton.width;
    var height = replayButton.height;
    clickReplayButton(x, y, width, height, pos);
}


// Évènement du bouton rejouer (clic)
function clickReplayButton(x, y, width, height, pos) {

    if (pos.x > x &&
        pos.x < x + width &&
        pos.y > y &&
        pos.y < y + height) {

        canvas.removeEventListener("mousemove", onMouseOverGameOver);
        canvas.removeEventListener("click", onMouseClickGameOver);

        isHoverGameOver = false;

        init();
        setCurrentGameStates(gamestates.Game);

    }

}
// Évènement du bouton rejouer (survol)
function hoverReplayButton(pos) {

    var replayButton = assets.replayButtonImg;
    var replayButtonHover = assets.replayButtonHoverImg;

    var x = 550;
    var y = 500;
    var width = replayButton.width;
    var height = replayButton.height;
    detectMouseOnGameOver(replayButton, replayButtonHover, x, y, width, height, pos);
}

// Évènement des boutons
function detectMouseOnGameOver(button, buttonHover, x, y, width, height, pos) {

    if (pos.x > x &&
        pos.x < x + width &&
        pos.y > y &&
        pos.y < y + height) {

        isHoverGameOver = true;
    } else {
        isHoverGameOver = false;
    }
}

