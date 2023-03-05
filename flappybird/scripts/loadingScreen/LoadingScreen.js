// Importations
import { gamestates, setCurrentGameStates, state } from "../GameStates.js";
import * as assets from "./Assets.js";
import { ctx, canvas } from "../Main.js";

// Timer pour passer au menu principale
var timer = 0;

// Initialise l'écran de chargement
export default function initLoadingScreen() {

	// Boucle de l'écran de chargement
	window.requestAnimationFrame(loopLoadingScreen);
}

// Affiche les éléments
function drawElements() {

	const title = assets.title;

	// Affiche le titre Flappy Bird
	ctx.drawImage(title, canvas.width / 2 - title.width / 2,
		canvas.height / 2 - title.height / 2 - 100);
}

// Boucle de l'écran de chargement
function loopLoadingScreen() {
	// Dessine les éléments
	drawElements();
	timer++;

	// Affiche le menu principale
	if (timer >= 80) {
		stopLoadingScreen();

		setCurrentGameStates(gamestates.MainMenu);

		state();
		// Arrête la boucle de l'écran de chargement
		window.cancelAnimationFrame(loopLoadingScreen);
	} else {
		window.requestAnimationFrame(loopLoadingScreen);
	}
}

// Enlève l'écran de chargement
function stopLoadingScreen() {

	// Efface le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Cache les gifs
	assets.flappyBirdAnimation.style.visibility = 'hidden';
	assets.loadingBar.style.visibility = 'hidden';

	timer = 0;
}