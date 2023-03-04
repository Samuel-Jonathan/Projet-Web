import Ball from "./ball.js";
import Paddle from "./paddle.js";
import Brick from "./bricks.js";
import Bonus from "./bonus.js";
import { circRectsOverlap } from "./collisions.js";

let tabBricks = [];
let canvas, ctx;
let paddle, ball, bonus;
let score = 0;
window.onload = init;


function init() {
    console.log("page chargée")
    canvas = document.querySelector("#gameCanvas");
    ctx = canvas.getContext("2d");

    ball = new Ball(canvas.width / 2, canvas.height - 80, 10, "green", 6, -6);
    bonus = new Bonus(0, 0, 10, "green", 0, 0);
    paddle = new Paddle(75, canvas.height - 50, 100, 10, 10, "red");
    createBricks(100,10,"blue");
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
    bonus.draw(ctx);
    for (let i = 0; i < tabBricks.length; i++) {
        tabBricks[i].draw(ctx);
        handleCollisionBallBrick(tabBricks[i]);

    }

    // 3 on met à jour
    bonus.update(canvas.width);
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

function handleCollisionBallBrick(brick) {
    if (circRectsOverlap(brick.x, brick.y, brick.width, brick.height, ball.x, ball.y, ball.radius)) {
        console.log("collision");
        if (ball.y < brick.y) {
            //collision par le haut
            ball.dy = -ball.dy;
            // On remet au point de contact
            ball.y = brick.y - ball.radius;
        } else if (ball.y > (brick.y + brick.height)) {
            // collision par le bas
            ball.dy = -ball.dy;
            // On remet au point de contact
            ball.y = brick.y + brick.height + ball.radius;
        } else if (ball.x < brick.x) {
            //collision par la gauche
            ball.dx = -ball.dx;
            // On remet au point de contact
            ball.x = brick.x - ball.radius;
        } else {
            // collision par la droite
            ball.dx = -ball.dx;
            // On remet au point de contact
            ball.x = brick.x + brick.width + ball.radius;
        }
        score++;
        //si la baller touche la brique, on la supprime
        const index = tabBricks.indexOf(brick);
        tabBricks.splice(index, 1);
    }
}

  

//creer une function score qui a chaque fois que la ballle touche une brick ca ajoute un point 



function createBricks(brickWidth, brickHeight, brickColor) {
    for (let l = 0; l < 9; l++) {
      for (let c = 0; c < 9; c++) {
        let x = l * (brickWidth + 10); // Add 10 pixels of spacing between bricks
        let y = c * (brickHeight + 20); // Add 20 pixels of spacing between rows of bricks
        let b = new Brick(x, y, brickWidth, brickHeight, brickColor);
        tabBricks.push(b);
        console.log(tabBricks);
      }
    }
  }
  



