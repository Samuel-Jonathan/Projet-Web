// Récupère le canvas
const canvas = document.getElementById("canvas");7

// Contexte du canvas
const ctx = canvas.getContext("2d");

// Récupère le Flappy Bird animé
const flappyBird = document.getElementById("flappy_bird");

// Récupère la barre de chargement
const loadingBar = document.getElementById("loading_bar");

// Titre Flappy Bird
var title = new Image(800,212);
title.src = "assets/loading_screen/title.png";

// Bouton pour jouer
var playButton = new Image(181, 104);
playButton.src = "assets/main_menu/play_button.png";

// Bouton pour le magasin
var shopButton = new Image(120, 120);
shopButton.src = "assets/main_menu/shop_button.png";

// Bouton pour les succès
var successButton = new Image(120, 120);
successButton.src = "assets/main_menu/success_button.png";

// Bouton pour le classement
var rankingButton = new Image(120, 120);
rankingButton.src = "assets/main_menu/ranking_button.png";

// Bouton pour les options
var settingsButton = new Image(120, 120);
settingsButton.src = "assets/main_menu/settings_button.png";