let headline = document.getElementById("headline");
let pointsDom = document.getElementById("points");

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let positions = [{ xPos: 50, yPos: 50 }];
let foodXPos, foodYPos;
let direction = "right";
let points = 0;
let gameOver = false;

setInterval(() => {
  if (!gameOver) gameloop();
}, 100);

window.addEventListener("keydown", changeDirection);

//add initial foot
addFood();

function gameloop() {
  recalculatePosition();
  checkGameOver();
  checkFoodCollision();

  //clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //render snake
  for (rect of positions) {
    ctx.fillRect(rect.xPos, rect.yPos, 10, 10);
  }

  //render food
  ctx.fillRect(foodXPos, foodYPos, 10, 10);
}

function checkFoodCollision() {
  if (foodXPos == positions[0].xPos && foodYPos == positions[0].yPos) {
    addReact();
    addFood();
    points++;
    pointsDom.innerText = "Points: " + points;
  }
}

function addReact() {
  let newXPos;
  let newYPos;

  switch (direction) {
    case "right":
      newXPos = positions[positions.length - 1].xPos - 10;
      newYPos = positions[positions.length - 1].yPos;
      break;
    case "left":
      newXPos = positions[positions.length - 1].xPos + 10;
      newYPos = positions[positions.length - 1].yPos;
      break;
    case "up":
      newXPos = positions[positions.length - 1].xPos;
      newYPos = positions[positions.length - 1].yPos + 10;
      break;
    case "down":
      newXPos = positions[positions.length - 1].xPos;
      newYPos = positions[positions.length - 1].yPos - 10;
      break;
  }

  positions.push({
    xPos: newXPos,
    yPos: newYPos,
  });
}

function addFood() {
  foodXPos = Math.floor(Math.random() * 49) * 10;
  foodYPos = Math.floor(Math.random() * 49) * 10;
}

function recalculatePosition() {
  //recalculate body
  for (let i = positions.length - 1; i >= 1; i--) {
    positions[i].xPos = positions[i - 1].xPos;
    positions[i].yPos = positions[i - 1].yPos;
  }

  //recalculate head
  switch (direction) {
    case "right":
      positions[0].xPos = positions[0].xPos + 10;
      break;
    case "left":
      positions[0].xPos = positions[0].xPos - 10;
      break;
    case "up":
      positions[0].yPos = positions[0].yPos - 10;
      break;
    case "down":
      positions[0].yPos = positions[0].yPos + 10;
      break;
  }
}

function checkGameOver() {
  //Border collision
  if (
    positions[0].xPos < 0 ||
    positions[0].xPos > 490 ||
    positions[0].yPos < 0 ||
    positions[0].yPos > 490
  ) {
    gameOver = true;
  }

  //Body collision
  for (let i = 1; i < positions.length; i++) {
    if (
      positions[i].xPos == positions[0].xPos &&
      positions[i].yPos == positions[0].yPos
    ) {
      gameOver = true;
    }
  }

  //give user Feeback
  if (gameOver) {
    headline.innerText = "Game over";
  }
}

function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction != "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction != "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction != "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction != "left") direction = "right";
      break;
  }
}
