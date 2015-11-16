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
    x:     Math.random() * width, 
    y:     Math.random() * height,
    dx:    Math.random() * 10,
    dy:    Math.random() * 10,
    id:    ball_array.length,
    color: getRandomColor()
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
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    detectCollision(ball);

    ball.x += ball.dx;
    ball.y += ball.dy;
  }
}

//detect collision with walls and other balls
function detectCollision(ball) {
    if (ball.x + ball.dx > width - ballRadius || ball.x + ball.dx < ballRadius) {
      ball.dx = -ball.dx;
        console.log('detected wall and ball collision');
    }
    if (ball.y + ball.dy > height - ballRadius || ball.y + ball.dy < ballRadius) {
      ball.dy = -ball.dy;
        console.log('detected wall and ball collision');
    }
    for (var i = 0; i < ball_array.length; i++) {
      console.log(ball.id + ", " + i);
      if (ball.id != i) {
        var otherBall = ball_array[i];
        var dx = ball.x - otherBall.x; 
        var dy = ball.y - otherBall.y;
        var dr = ballRadius * 2;
        console.log(dx + ", " + dy);
        if ((Math.pow(dx, 2) + Math.pow(dy, 2)) < Math.pow(dr, 2)) {
          ball.dy = -ball.dy;
          ball.dx = -ball.dx;
          console.log('detected ball and ball collision');
        }
      }
    }
}

//return random color code
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//add new ball when canvas is clicked
canvas.addEventListener("click", addBall);

//paint canvas
setInterval(paint, 20);
