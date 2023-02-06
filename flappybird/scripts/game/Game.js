var player;

function initGame() {
  // Efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player = new Player(playerImg, new Vector2(canvas.width / 2, canvas.height / 2), new Vector2(0, 2));

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

  player.draw();

  requestAnimationFrame(loopGame);
}
