import { Player } from "./Player.js";
import { ctx, canvas } from "../Main.js";
import * as assets from "./Assets.js";
import { Vector2 } from "./Vector2.js";

var player;

export default function initGame() {

  var playerImg = assets.playerImg;

  // Efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player = new Player(ctx, playerImg, new Vector2(canvas.width / 2, canvas.height / 2), new Vector2(0, 2), 75, 55, 0, 0, 169, 124, 0);

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

  player.applyGravity();

  player.update();

  player.draw();

  player.animation();

  requestAnimationFrame(loopGame);
}
