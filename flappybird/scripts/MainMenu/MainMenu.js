// Importations
import { setCurrentGameStates, state, gamestates } from "../Gamestates.js";
import * as assets from "./Assets.js";
import { ctx, canvas } from "../Main.js"; 

// Initialise le menu principale
export default function initMainMenu() {

    // Récupère les images
    const title = assets.title;
    const playButton = assets.playButton;
    const shopButton = assets.shopButton;
    const successButton = assets.successButton;
    const rankingButton = assets.rankingButton;
    const settingsButton = assets.settingsButton;
    
    // Arrière-plan du canvas
    canvas.style.background = 'url(/flappybird/assets/mainMenu/background.png)';

    // Affiche le titre
    ctx.drawImage(title, canvas.width / 2 - title.width / 2,
        canvas.height / 2 - title.height / 2 - 100);

    // Affiche le bouton jouer
    ctx.drawImage(playButton, canvas.width / 2 - playButton.width / 2,
        canvas.height / 2 - playButton.height / 2 + 100);
    
    // Affiche le bouton pour le classement
    ctx.drawImage(rankingButton, canvas.width / 2 - rankingButton.width / 2 + 400,
        canvas.height / 2 - rankingButton.height / 2 + 235, 120, 120);

    // Affiche le bouton pour les succès
    ctx.drawImage(successButton, canvas.width / 2 - successButton.width / 2 + 200,
        canvas.height / 2 - successButton.height / 2 + 235, 120, 120);

    // Affiche le bouton pour le magasin
    ctx.drawImage(shopButton, canvas.width / 2 - shopButton.width / 2 - 200,
        canvas.height / 2 - shopButton.height / 2 + 235, 120, 120);

    // Affiche le bouton pour les options
    ctx.drawImage(settingsButton, canvas.width / 2 - settingsButton.width / 2 - 390,
        canvas.height / 2 - settingsButton.height / 2 + 235, 120, 120);


    // Évènements
    canvas.addEventListener("mousemove", onMouseOverMainMenu);
    canvas.addEventListener("click", onMouseClickMainMenu);

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
function onMouseOverMainMenu(e) {

    var pos = getMousePos(canvas, e);

    hoverPlayButton(pos);
    hoverShopButton(pos);
    hoverRankingButton(pos);
    hoverSettingsButton(pos);
    hoverSuccessButton(pos);
}

// Évènement du bouton joueur
function onMouseClickMainMenu(e) {

    var playButton = assets.playButton;

    var pos = getMousePos(canvas, e);

    var x = canvas.width / 2 - playButton.width / 2;
    var y = canvas.height / 2 - playButton.height / 2 + 100;
    var width = playButton.width;
    var height = playButton.height;
    clickPlayButton(x, y, width, height, pos);
}

// Évènement du bouton joueur (clic)
function clickPlayButton(x, y, width, height, pos) {

    if (pos.x > x &&
        pos.x < x + width &&
        pos.y > y &&
        pos.y < y + height) {

        canvas.removeEventListener("mousemove", onMouseOverMainMenu);
        canvas.removeEventListener("click", onMouseClickMainMenu);
        setCurrentGameStates(gamestates.Game);
        state();
    }

}

// Évènement du bouton jouer (survol)
function hoverPlayButton(pos) {

    var playButton = assets.playButton;
    var playButtonHover = assets.playButtonHover;
    
    var x = canvas.width / 2 - playButton.width / 2;
    var y = canvas.height / 2 - playButton.height / 2 + 100;
    var width = playButton.width;
    var height = playButton.height;
    detectMouseOnMainMenu(playButton, playButtonHover, x, y, width, height, pos);
}


// Évènement du bouton boutique (survol)
function hoverShopButton(pos) {

    var shopButton = assets.shopButton;
    var shopButtonHover = assets.shopButtonHover;

    var x = canvas.width / 2 - shopButton.width / 2 - 200;
    var y = canvas.height / 2 - shopButton.height / 2 + 235;
    var width = shopButton.width;
    var height = shopButton.height;

    detectMouseOnMainMenu(shopButton, shopButtonHover, x, y, width, height, pos);
}

// Évènement du bouton classement (survol)
function hoverRankingButton(pos) {

    var rankingButton = assets.rankingButton;
    var rankingButtonHover = assets.rankingButtonHover;

    var x = canvas.width / 2 - rankingButton.width / 2 + 400;
    var y = canvas.height / 2 - rankingButton.height / 2 + 235;
    var width = rankingButton.width;
    var height = rankingButton.height;
    detectMouseOnMainMenu(rankingButton, rankingButtonHover, x, y, width, height, pos);
}

// Évènement du bouton options (survol)
function hoverSettingsButton(pos) {

    var settingsButton = assets.settingsButton;
    var settingsButtonHover = assets.settingsButtonHover;

    var x = canvas.width / 2 - settingsButton.width / 2 - 390;
    var y = canvas.height / 2 - settingsButton.height / 2 + 235;
    var width = settingsButton.width;
    var height = settingsButton.height;

    detectMouseOnMainMenu(settingsButton, settingsButtonHover, x, y, width, height, pos);
}

// Évènement du bouton succès (survol)
function hoverSuccessButton(pos) {

    var successButton = assets.successButton;
    var successButtonHover = assets.successButtonHover;

    var x = canvas.width / 2 - successButton.width / 2 + 200;
    var y = canvas.height / 2 - successButton.height / 2 + 235;
    var width = successButton.width;
    var height = successButton.height;

    detectMouseOnMainMenu(successButton, successButtonHover, x, y, width, height, pos);
}

// Évènement des boutons
function detectMouseOnMainMenu(button, buttonHover, x, y, width, height, pos) {

    if (pos.x > x &&
        pos.x < x + width &&
        pos.y > y &&
        pos.y < y + height) {
        // Affiche le bouton (hover)
        ctx.drawImage(buttonHover, x, y, width, height);
    } else {
        // Affiche le bouton 
        ctx.drawImage(button, x, y, width, height);
    }
}
