import Paddle from "./paddle.js";
import Ball from "./ball.js";
import { circRectsOverlap } from "./collisions.js";


let canvas, ctx;
let paddle, ball;

window.onload = init;


function init() {
    console.log("page chargée")
    canvas = document.querySelector("#gameCanvas");
    ctx = canvas.getContext("2d");
    paddle = new Paddle(75, canvas.height - 50, 100, 10, 10, "blue");
    ball = new Ball(canvas.width / 2, canvas.height - 80, 10, "red", 6, -6);
    document.addEventListener("keydown", paddle.handleKeyDown.bind(paddle));
    document.addEventListener("keyup", paddle.handleKeyUp.bind(paddle));
    requestAnimationFrame(gameLoop);
}


function gameLoop(time) {
    // 1 on efface
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 on dessinea
    ball.draw(ctx);
    paddle.draw(ctx);
   
    // 3 on met à jour
    paddle.update(canvas.width);
    handleCollisionBallPaddle();
    ball.update(canvas.width, canvas.height);
    requestAnimationFrame(gameLoop);
}

function handleCollisionBallPaddle() {
    if (circRectsOverlap(paddle.x, paddle.y, paddle.width, paddle.height, ball.x, ball.y, ball.radius)) {
        if (ball.y < paddle.y) {
            //collision par le haut
            ball.dy = -ball.dy;
            // On remet au point de contact
            ball.y = paddle.y - ball.radius;
        } else if (ball.y > (paddle.y + paddle.height)) {
            // collision par le bas
            ball.dy = -ball.dy;
            // On remet au point de contact
            ball.y = paddle.y + paddle.height + ball.radius;
        } else if (ball.x < paddle.x) {
            //collision par la gauche
            ball.dx = -ball.dx;
            // On remet au point de contact
            ball.x = paddle.x - ball.radius;
        } else {
            // collision par la droite
            ball.dx = -ball.dx;
            // On remet au point de contact
            ball.x = paddle.x + paddle.width + ball.radius;
        }

    }
}




