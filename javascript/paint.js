/*Functions involving painting on canvas*/

//paint canvas with white background and black trim
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, width, height);
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.getPosition().getX(), ball.getPosition().getY(), ball.getRadius(), 0, Math.PI*2);
  ctx.fillStyle = ball.getColor();
  ctx.fill();
  ctx.closePath();
}

function updateTable(ball) {
  //id mass x y v_x v_y          
  var row = rows[ball.id + 1];
  console.log(row);
  row.cells[0].innerHTML = ball.id;
  row.cells[1].innerHTML = Math.round(ball.mass * 10) / 10;
  row.cells[2].innerHTML = Math.round(ball.position.x * 10) / 10;
  row.cells[3].innerHTML = Math.round(ball.position.y * 10) / 10;
  row.cells[4].innerHTML = Math.round(ball.final_velocity.x * 10) / 10;
  row.cells[5].innerHTML = Math.round(ball.final_velocity.y * 10) / 10;
}

function paint() {
  drawCanvas();
  for (var i = 0; i < ball_array.length; i++) {
    var ball = ball_array[i];
    if (outOfBounds(ball)) {
      removeBall(ball);
    }
    updateCollision(ball);
    moveBall(ball);
    drawBall(ball);
    updateTable(ball);
  }
  drawFPS();
  ctx.font = "10px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Balls: " + ball_array.length, width - 50, 40);
}

//create fps function in fps object
var fps = {
  startTime: 0,
  frameNumber: 0,
  //returns current fps
  getFPS: function() {
    //counts frames
    this.frameNumber++;
    //post frame count time
    var d = new Date().getTime(),
        //get difference between startime and post frame count time
        currentTime = (d - this.startTime) / 1000,
        result = Math.floor((this.frameNumber / currentTime));

    //reset variables
    if( currentTime > 1 ){
      this.startTime = new Date().getTime();
      this.frameNumber = 0;
    }
    return result;
  }
};  

//add fps counter to canvas
function drawFPS() {
  ctx.font = "10px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("FPS: " + fps.getFPS(), width - 50, 20);
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

