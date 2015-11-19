/*Create a ball object with proper 
 * getters and setters for variables*/

var ball = (function (ctx) {
  var id,
    //x,
    //y,
    color,
    mass,
    radius,
    position,
    //initial_position,
    //final_position,
    final_velocity,
    initial_velocity;

  //constructor
  function ball(x, y, color, mass, radius, vx, vy, id) {
    //this.setX(x);
    //this.setY(y);
    this.initial_velocity = new vector(vx, vy);
    this.final_velocity = new vector(vx, vy);
    this.position = new vector(x, y);
    //this.initial_position = new vector(x, y);
    //this.final_position = new vector(x, y);
    this.setColor(color);
    this.setMass(mass);
    this.setRadius(radius);
    this.setId(id);
  }

  //coordinates
 /* 
  ball.prototype.setX = function (x) { 
    this.x = x;
  }
 /* 
  ball.prototype.getX = function () {
    return this.x; 
  }
  
  ball.prototype.setY = function (y) { 
    this.y = y;
  }
  ball.prototype.getY = function () {
    return this.y;
  }
  */

  ball.prototype.getPosition = function(x, y) {
    return this.position
  }
  ball.prototype.setPosition = function(x, y) {
    this.position.setMagnitude(x, y);
  }

  ball.prototype.setId = function (id) {
    this.id = id;
  }
  ball.prototype.getId = function () {
    return this.id;
  }
/*
  ball.prototype.setInitialPosition = function (x, y) {
    this.initial_position.setMagnitude(x, y);
  }
  ball.prototype.getInitialPosition = function () {
    return this.initial_position;
  }

  ball.prototype.setFinalPosition = function (x, y) {
    this.final_position.setMagnitude(x, y);
  }
  ball.prototype.getFinalPosition = function () {
    return this.final_position;
  }
  */

  ball.prototype.setInitialVelocity = function (ux, uy) {
    this.initial_velocity.setMagnitude(ux, uy);
  }
  ball.prototype.getInitialVelocity = function () {
    return this.initial_velocity;
  }

  ball.prototype.setFinalVelocity = function (ux, uy) {
    this.final_velocity.setMagnitude(ux, uy);
  }
  ball.prototype.getFinalVelocity = function () {
    return this.final_velocity;
  }

  ball.prototype.invertX = function () {
    var x = this.final_velocity.getX();
    this.final_velocity.setX(-x);
  }
  ball.prototype.invertY = function () {
    var y = this.final_velocity.getY();
    this.final_velocity.setY(-y);
  }


  //radius
  ball.prototype.setRadius = function (radius) { 
    this.radius = radius;
  }
  ball.prototype.getRadius = function () { 
    return this.radius;
  }

  //mass
  ball.prototype.setMass = function (mass) { 
    this.mass = mass;
  }
  ball.prototype.getMass = function () { 
    return this.mass;
  }

  //color
  ball.prototype.setColor = function (color) { 
    this.color = color;
  }
  ball.prototype.getColor = function () { 
    return this.color;
  }

  return ball; 

})();
