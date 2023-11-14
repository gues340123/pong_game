
const gameContainer = document.getElementById("gameContainer");
const paddleA = document.getElementById("paddleA");
const paddleB = document.getElementById("paddleB");
const ball = document.getElementById("ball");
// Initialize score variables
let scoreA = 0;
let scoreB = 0;
const scoreAElement = document.getElementById("scoreA");
const scoreBElement = document.getElementById("scoreB");



let paddleHeight = 70;
let paddleWidth = 10;
let ballSize = 15;
let ballX = gameContainer.offsetWidth / 2 - ballSize / 2;
let ballY = gameContainer.offsetHeight / 2 - ballSize / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;
let paddleAX = 20;
let paddleAY = gameContainer.offsetHeight / 2 - paddleHeight / 2;
let paddleBX = gameContainer.offsetWidth - 20 - paddleWidth;
let paddleBY = gameContainer.offsetHeight / 2 - paddleHeight / 2;

let keysPressed = {};
document.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
});
document.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
});

function gameLoop() {
    if (keysPressed['w'] && paddleAY > 0) {
        paddleAY -= 5;
    }
    if (keysPressed['s'] && paddleAY < gameContainer.offsetHeight - paddleHeight) {
        paddleAY += 5;
    }
    if (keysPressed['ArrowUp'] && paddleBY > 0) {
        paddleBY -= 5;
    }
    if (keysPressed['ArrowDown'] && paddleBY < gameContainer.offsetHeight - paddleHeight) {
        paddleBY += 5;
    }

    paddleA.style.top = paddleAY + 'px';
    paddleB.style.top = paddleBY + 'px';

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= gameContainer.offsetHeight - ballSize) {
        ballSpeedY *= -1;
    }

    if (ballX <= (paddleAX + paddleWidth) && ballY + ballSize > paddleAY && ballY < paddleAY + paddleHeight ||
        ballX >= (paddleBX - paddleWidth) && ballY + ballSize > paddleBY && ballY < paddleBY + paddleHeight) {
        ballSpeedX *= -1;
    }

    if (ballX < 0 || ballX > gameContainer.offsetWidth) {

// Update scoring logic in the game loop
// If the ball goes out on the left side, increment score for Player B
	if (ballX < 0) {
    		scoreB++;
    		scoreBElement.innerText = scoreB;
    		// Reset ball
		}

// If the ball goes out on the right side, increment score for Player A
	if (ballX > gameContainer.offsetWidth) {
   		scoreA++;
    		scoreAElement.innerText = scoreA;
    		// Reset ball
		}

        ballX = gameContainer.offsetWidth / 2 - ballSize / 2;
        ballY = gameContainer.offsetHeight / 2 - ballSize / 2;
        ballSpeedX = 2;
        ballSpeedY = 2;
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';



    requestAnimationFrame(gameLoop);
}

gameLoop();

