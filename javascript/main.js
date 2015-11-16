//global variables
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var width = $("#canvas").width();
var height = $("#canvas").height();
var ballRadius = 10
var ball_array = [];


//functions
function addBall() {
  ball_array.push({
    x:  Math.random() * width, 
    y:  Math.random() * height,
    dx: Math.random(),
    dy: Math.random()
  });
}

function paint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //paint canvas with white background and black trim
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, width, height);

  for (var i = 0; i < ball_array.length; i++) {
    var ball = ball_array[i];
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    if(ball.x + ball.dx > width - ballRadius || ball.x + ball.dx < ballRadius) {
      ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy > height - ballRadius || ball.y + ball.dy < ballRadius) {
      ball.dy = -ball.dy;
    }


    ball.x += ball.dx;
    ball.y += ball.dy;
  }
}

//add new ball when canvas is clicked
canvas.addEventListener("click", addBall);

//paint canvas
setInterval(paint, 10);
