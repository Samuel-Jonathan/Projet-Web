import { Player } from "./Player.js";
import { Pipe } from "./Pipe.js";
import { ctx, canvas } from "../Main.js";
import * as assets from "./Assets.js";
import { Vector2 } from "./Vector2.js";

var player;

var pipe = [];

var xPipe = 1000;
var yPipe;

var moveBackground = 0;

var generatePipeTime = 0;

export default function initGame() {

  var playerImg = assets.playerImg;

  // Efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player = new Player(ctx, playerImg, new Vector2(canvas.width / 2, canvas.height / 2), new Vector2(0, 2), 75, 55, 0, 0, 156, 114, 0);

  window.addEventListener("keydown", (event) => {
    if (event.code == "Space") {
      player.jump();
    }
  });

  requestAnimationFrame(loopGame);
}



function loopGame() {

  // Efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  scrollBackground();
  createPlayer();
  createPipes();

  requestAnimationFrame(loopGame);


}

function createPlayer() {
  player.applyGravity();
  player.update();
  player.draw();
  player.animation();
}

function scrollBackground() {
  moveBackground -= 4;
  canvas.style.backgroundPositionX = moveBackground + "px";
}

function createPipes() {
  var pipeImg = assets.pipeImg;

  const GENERATE_PIPE_TIME_MAX = random(40, 50);

  generatePipeTime++;

  if (generatePipeTime >= GENERATE_PIPE_TIME_MAX) {
    yPipe = (random(100, 400)) * -1;
    pipe[pipe.length] = new Pipe(ctx, pipeImg, new Vector2(xPipe, yPipe), 100, 575);
    xPipe += random(200, 300);

    generatePipeTime = 0;
  }


  for (let i = 0; i < pipe.length; i++) {
    pipe[i].draw();
    pipe[i].move();
  }

}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
