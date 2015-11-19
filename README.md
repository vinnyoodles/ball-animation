#Ball animation application

##Overview

My first javascript appication with HTML5 and CSS in order to practice basic animation and test my first physics engine

######How it works
Just click the canvas, which has a black trim, to add a ball. Currently, I am using a brute force method to detect collision which will drop FPS rate drastically as each ball quadratically decreases performance. The goal is to add spatial partitioning using the QuadTree data structure which will improve performance with a large amount of balls.

#####Sources
[Physics equation](http://www.vobarian.com/collisions/2dcollisions2.pdf)
[StackOverflow](http://gamedev.stackexchange.com/questions/20516/ball-collisions-sticking-together)
