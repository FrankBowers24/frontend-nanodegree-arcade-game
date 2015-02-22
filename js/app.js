var yOffset = 20;
var blockWidth = 101;
var blockHeight = 83;
var yBlocks = 6;
var xBlocks = 5;
var yLimit = blockHeight * yBlocks;
var xLimit = blockWidth * xBlocks;


// Enemies our player must avoid
var Enemy = function (x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  this.x = (this.x + this.speed * dt);
  this.x = this.x > xLimit ? -blockWidth : this.x;
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.hasCollision = function(player) {
  return this.x < player.x + blockWidth &&
   this.x + blockWidth > player.x &&
   this.y < player.y + blockHeight &&
   blockHeight + this.y > player.y;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
  this.x = x;
  this.y = y;
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (direction) {
  console.log(direction);
  if (direction === 'left') {
    this.x = this.x - blockWidth >= 0 ? this.x -= blockWidth : this.x;
  } else if (direction === 'right') {
    this.x = this.x + blockWidth < xLimit ? this.x += blockWidth : this.x;
  } else if (direction === 'up') {
    this.y = this.y - blockHeight >= -yOffset ? this.y -= blockHeight : this.y;
  } else if (direction === 'down') {
    this.y = this.y + blockHeight < yLimit - yOffset ? this.y += blockHeight : this.y;
  }
}

Player.prototype.reset = function() {
    this.y = blockHeight * 5 - yOffset;
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-200, blockHeight - yOffset, 55),
  new Enemy(-blockWidth, blockHeight * 2 - yOffset, 60),
  new Enemy(-300, blockHeight * 3 - yOffset, 80),
  new Enemy(-200, blockHeight * 3 - yOffset, 200),
  new Enemy(-500, blockHeight - yOffset, 130)
];

var player = new Player(blockWidth * 2, blockHeight * 5 - yOffset);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});