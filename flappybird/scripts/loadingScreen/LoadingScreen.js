// Importations
import { gamestates, setCurrentGameStates } from "../GameStates.js";
import * as assets from "./Assets.js";
import { ctx, canvas } from "../Main.js";

// Timer pour passer au menu principale
var timer = 0;

// Affiche les éléments
export function drawElements() {

	const title = assets.title;

	// Affiche le titre Flappy Bird
	ctx.drawImage(title, canvas.width / 2 - title.width / 2,
		canvas.height / 2 - title.height / 2 - 100);
}

// Boucle de l'écran de chargement
export function loadingScreen() {
	// Dessine les éléments
	drawElements();
	timer++;

	// Affiche le menu principale
	if (timer >= 80) {
		stopLoadingScreen();
		setCurrentGameStates(gamestates.MainMenu);
	

	}
}

// Enlève l'écran de chargement
function stopLoadingScreen() {

	// Cache les gifs
	assets.flappyBirdAnimation.style.visibility = 'hidden';
	assets.loadingBar.style.visibility = 'hidden';

	timer = 0;
}