/*create vector object with 
 * basic vector math functions*/

var vector = (function() {
  var x,
    y; 

  //constructor
  function vector(x, y) {
    this.setX(x); 
    this.setY(y);
  }
  
  vector.prototype.getX = function() {
    return this.x;
  }

  vector.prototype.getY = function() {
    return this.y;
  }

  vector.prototype.setX = function(x) {
    this.x = x;
  }

  vector.prototype.setY = function(y) {
    this.y = y;
  }

  vector.prototype.setMagnitude = function(x, y) {
    this.setX(x);
    this.setY(y);
    return this;
  }

  //Vector functions

  //sum two vectors
  //return new vector
  vector.prototype.add = function(vectorB) {
    var x = (this.getX() + vectorB.getX());
    var y = (this.getY() + vectorB.getY());
    return new vector(x, y);
  }

  //subtract two vectors 
  //return new vector
  vector.prototype.subtract = function(vectorB) {
    var x = (this.getX() - vectorB.getX());
    var y = (this.getY() - vectorB.getY());
    return new vector(x, y);
  }

  //multiple vector by value 
  //return new vector
  vector.prototype.multiply = function(value) {
    var x = (this.getX() * value); 
    var y = (this.getY() * value);
    return new vector(x, y);
  }


  //divide vector by value 
  //return new vector
  vector.prototype.divide = function(value) {
    var x = (this.getX() / value); 
    var y = (this.getY() / value);
    return new vector(x, y);
  }
  
  //return dot product value with vectorB
  vector.prototype.dot = function(vectorB) {
    return ((this.getX() * vectorB.getX()) + (this.getY() * vectorB.getY()));
  } 

  //return magnitude of vector
  vector.prototype.magnitude = function() {
    return Math.sqrt(Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2));
  }

  //return new vector
  //with normalized values or scaled down values (as unit vector)
  vector.prototype.normalize = function() {
    return this.divide(this.magnitude());
  }

  return vector;

})();
