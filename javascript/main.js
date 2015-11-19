//global variables
var canvas = $("#canvas")[0],
    ctx = canvas.getContext("2d"),
    width = $("#canvas").width(),
    height = $("#canvas").height(),
    ball_array = [],
    f = document.querySelector("#fps");


//run animation
setInterval(paint, 10);

//add new ball when canvas is clicked
canvas.addEventListener("click", addBall);

//create ball object with random variables
function addBall() {
  var x = Math.random() * width; 
  var y = Math.random() * height; 
  var color = getRandomColor();
  var radius = Math.random() * 20 + 5;
  var mass = 0.01 * Math.pow(radius, 3); 
  var vx = (Math.random() - 0.5) * 10;
  var vy = (Math.random() - 0.5) * 10;
  var id = ball_array.length; 
  ball_array.push(new ball(x, y, color, mass, radius, vx, vy, id));
}

function moveBall(ball) {
  var fx = ball.getFinalVelocity().getX();
  var fy = ball.getFinalVelocity().getY();
  var x = ball.getPosition().getX();
  var y = ball.getPosition().getY();
  //move final position
  ball.setPosition(x + fx, y + fy);
  //reset initial position and velocigy
  ball.setInitialVelocity(fx, fy);
  //ball.setInitialPosition(x + fx, y + fy);
}

function updateCollision(ball) {
  if (ball.getPosition().getX() + ball.getRadius() >= width || ball.getPosition().getX() - ball.getRadius() <= 0) {
    ball.invertX();
  }
  if (ball.getPosition().getY() + ball.getRadius() >= height || ball.getPosition().getY() - ball.getRadius() <= 0) {
    ball.invertY();
  }
  for (var i = 0; i < ball_array.length; i++) {
    if (ball.getId() != i && isCollidingWithBall(ball, ball_array[i])) {
      //vector equation for 2d collision
      debugger;
      var other_ball = ball_array[i];
      var mass1 = ball.getMass();
      var mass2 = other_ball.getMass();
      var v1 = ball.getInitialVelocity();
      var v2 = other_ball.getInitialVelocity();

      var x_distance = other_ball.getPosition().getX() - ball.getPosition().getX();
      var y_distance = other_ball.getPosition().getY() - ball.getPosition().getY();

      //create vecotrs with the difference of 
      //distance and velocity
      var ddistance = new vector(x_distance, y_distance); 
      var dvelocity = v1.subtract(v2);

      //check if the balls are heading toward each other
      //to prevent balls from sticking to each other
      if (ddistance.dot(dvelocity) > 0) {

        //unit vector
        var normal_vector = new vector(x_distance, y_distance).normalize();
        //tangent vector is opposite reciprocal of normal vector
        var tangent_vector = new vector(-normal_vector.getY(), normal_vector.getX());

        var normal_scalar = normal_vector.dot(v1);
        var normal_scalar2 = normal_vector.dot(v2);
        var tangential_scalar = tangent_vector.dot(v1);

        var dm = mass1  - mass2;
        var sum_of_mass = mass1 + mass2;

        var final_normal_scalar = ((normal_scalar * dm) + (2 * mass2 * normal_scalar2)) / sum_of_mass

          var final_normal_vector = normal_vector.multiply(final_normal_scalar); 
        var final_tangent_vector = tangent_vector.multiply(tangential_scalar);

        var final_velocity = final_normal_vector.add(final_tangent_vector); 

        //update final velocity
        ball.setFinalVelocity(final_velocity.getX(), final_velocity.getY());
        console.log('ball ball collision');
      }
    }
  }

}

//check collision using pythagoras theorem
function isCollidingWithBall(ball, otherBall) {
  var dx = ball.getPosition().getX() - otherBall.getPosition().getX(); 
  var dy = ball.getPosition().getY() - otherBall.getPosition().getY();
  var dr = ball.getRadius() + otherBall.getRadius();
  return ((Math.pow(dx, 2) + Math.pow(dy, 2)) < Math.pow(dr, 2));
}

function removeBall(ball) {
  index = ball_array.indexOf(ball);
  if (index > -1) {
    ball_array.splice(index, 1);
  }
}

function outOfBounds(ball) {
  var x = ball.getPosition().getX();
  var y = ball.getPosition().getY();
  return isNaN(x) || isNaN(y) || x < 0 || y < 0 || x > width || y > height ;
}

