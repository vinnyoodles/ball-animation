//global variables
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var width = $("#canvas").width();
var height = $("#canvas").height();
var ballRadius = 10
var ball_array = [];
var f = document.querySelector("#fps");

//create fps function in fps object
var fps = {
  startTime : 0,
  frameNumber : 0,
  getFPS : function(){
    this.frameNumber++;
    var d = new Date().getTime(),
        currentTime = ( d - this.startTime ) / 1000,
        result = Math.floor( ( this.frameNumber / currentTime ) );

    if( currentTime > 1 ){
      this.startTime = new Date().getTime();
      this.frameNumber = 0;
    }
    return result;

  }
};  

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

//paint canvas with white background and black trim
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, width, height);
}

function paint() {
  drawCanvas();
  for (var i = 0; i < ball_array.length; i++) {
    var ball = ball_array[i];
    drawBall(ball);
    detectCollision(ball);
    moveBall(ball);
  }
  drawFPS();
}

function drawFPS() {
  ctx.font = "10px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("FPS: " + fps.getFPS(), width - 50, 20);
}

function drawBall(ball){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function moveBall(ball){
  ball.x += ball.dx;
  ball.y += ball.dy;
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
    if (ball.id != i && isCollidingWithBall(ball, ball_array[i])) {
      ball.dy = -ball.dy;
      ball.dx = -ball.dx;
      console.log('detected ball and ball collision');
    }
  }
}

function isCollidingWithBall(ball, otherBall) {
  var dx = ball.x - otherBall.x; 
  var dy = ball.y - otherBall.y;
  var dr = ballRadius * 2;
  console.log(dx + ", " + dy);
  return ((Math.pow(dx, 2) + Math.pow(dy, 2)) < Math.pow(dr, 2)); 
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
