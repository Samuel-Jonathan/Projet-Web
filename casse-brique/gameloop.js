import Ball from "./ball.js";
import Paddle from "./paddle.js";
import Brick from "./bricks.js";
import { circRectsOverlap } from "./collisions.js";

let tabBricks = [];
let canvas, ctx;
let paddle, ball, brick;
let score = 0;
window.onload = init;


function init() {
    console.log("page chargée")
    canvas = document.querySelector("#gameCanvas");
    ctx = canvas.getContext("2d");
    paddle = new Paddle(75, canvas.height - 50, 100, 10, 10, "blue");
    ball = new Ball(canvas.width / 2, canvas.height - 80, 10, "red", 6, -6);
    brick = new Brick(100, 100, 100, 10, "black");
    createBricks();
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
    for (let i = 0; i < tabBricks.length; i++) {
        tabBricks[i].draw(ctx);
        handleCollisionBallBrick(tabBricks[i]);

    }

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



function createBricks() {
    for (let l = 0; l < 9; l++) { // iterate 9 times
        for (let c = 0; c < 9; c++) { // iterate 9 times
            let x = l * 110; // x = 0, 110, 220, 330, 440, 550, 660, 770, 880
            let y = c * 20; // y = 0, 20, 40, 60, 80, 100, 120, 140, 160
            let width = 100;
            let height = 10;
            let color = "blue";
            let b = new Brick(x, y, width, height, color);
            tabBricks.push(b);
            console.log(tabBricks);
        }
    }
}



