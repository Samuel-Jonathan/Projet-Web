// Importations
import { Player } from "./Player.js";
import { Pipe } from "./Pipe.js";
import { ctx, canvas } from "../Main.js";
import * as assets from "./Assets.js";
import { Vector2 } from "./Vector2.js";
import { Floor } from "./Floor.js";

// Joueur
var player;

// Tuyaux
var pipe = [];

var xPipe = 1000;
var yPipe;
var generatePipeTime = 0;

var floor;

var moveBackground = 0;


export default function initGame() {

  // Récupère l'image du joueur
  const playerImg = assets.playerImg;

  // Efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Crée le joueur
  player = new Player(ctx, playerImg, new Vector2(canvas.width / 2, canvas.height / 2), new Vector2(0, 2), 75, 55, 0, 0, 156, 114, 0);

  // Saut du joueur
  window.addEventListener("keydown", (event) => {
    if (event.code == "Space") {
      player.jump();
    }
  });

  floor = new Floor(ctx, assets.floorImg, 0, 644, 1000, 56);

  requestAnimationFrame(loopGame);
}


function loopGame() {
  // Efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // Fait défiler l'arrière-plan
  scrollBackground();
  // Crée le joueur
  createPlayer();
  // Crée les tuyaux
  createPipes();
  // Crée le sol
  createFloor();

  requestAnimationFrame(loopGame);


}

function createPlayer() {
  // Applique la gravité au joueur
  player.applyGravity();
  player.update();
  // Dessine le joueur
  player.draw();
  // Animation du joueur
  player.animation();
}

function scrollBackground() {
  const VELOCITY_SCROLL_BACKGROUND = 4;
  moveBackground -= VELOCITY_SCROLL_BACKGROUND;
  canvas.style.backgroundPositionX = moveBackground + "px";
}

function createPipes() {
  // Récupère l'image du tuyau
  const pipeImg = assets.pipeImg;
  const pipe2Img = assets.pipe2Img;

  const GENERATE_PIPE_TIME_MAX = random(40, 50);

  generatePipeTime++;

  // Crée un tuyau
  if (generatePipeTime >= GENERATE_PIPE_TIME_MAX) {
    yPipe = (random(500, 200)) * -1;

    pipe[pipe.length] = new Pipe(ctx, pipeImg, new Vector2(xPipe, yPipe), 100, 575);
    pipe[pipe.length] = new Pipe(ctx, pipe2Img, new Vector2(xPipe, yPipe + 575 + 180), 100, 575);


    xPipe += random(200, 300);

    generatePipeTime = 0;


  }


  for (let i = 0; i < pipe.length; i++) {

    // Dessine les tuyaux
    pipe[i].draw();
    // Déplace les tuyaux
    pipe[i].move();
  }

}

function createFloor() {

  floor.draw();
  floor.regenerateFloor();

}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
