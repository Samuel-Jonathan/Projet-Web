import Paddle from "./paddle.js";


let canvas, ctx;
let paddle

window.onload = init;


function init() {
    console.log("page chargée")
    canvas = document.querySelector("#gameCanvas");
    ctx = canvas.getContext("2d");
    paddle = new Paddle(75, canvas.height - 50, 100, 10, 10, "blue");
    document.addEventListener("keydown", paddle.handleKeyDown.bind(paddle));
    document.addEventListener("keyup", paddle.handleKeyUp.bind(paddle));
    requestAnimationFrame(gameLoop);
}


function gameLoop(time) {
    // 1 on efface
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 on dessinea
    paddle.draw(ctx);
   
    // 3 on met à jour
    paddle.update(canvas.width);
    requestAnimationFrame(gameLoop);
}




