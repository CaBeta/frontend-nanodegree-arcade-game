var playerInitialPosition = { x: 202, y: 386 }
var enemyInitialPosition = { x: -101, y: 303 }
var gameBoundaries = {left:0,right:404,top:54,bottom:386}
var block = {width:101,height:83}
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    this.checkCollisions();
    if(this.x>gameBoundaries.right+block.width){
        this.reset();
    }
};
Enemy.prototype.reset = function () {
    this.speed = Math.random() * 300 + 50;
    this.x = enemyInitialPosition.x;
    this.y = enemyInitialPosition.y - (parseInt(3 * Math.random())+1) * block.height;
}
Enemy.prototype.checkCollisions = function(){
    if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50){
        player.reset();
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.reset();
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function(dt){

}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}
Player.prototype.reset = function(){
    this.x = playerInitialPosition.x;
    this.y = playerInitialPosition.y;
}
Player.prototype.handleInput = function(key){
    switch (key) {
        case "left":
            this.x -= block.width;
            break;
        case "up":
            this.y -= block.height;
            break;
        case "right":
            this.x += block.width;
            break;
        case "down":
            this.y += block.height;
            break;
        default:
            break;
    }
    if(this.x>gameBoundaries.right){
        this.x = gameBoundaries.right;
    }
    if(this.x<gameBoundaries.left){
        this.x = gameBoundaries.left;
    }
    if(this.y>gameBoundaries.bottom){
        this.y = gameBoundaries.bottom;
    }
    if(this.y<gameBoundaries.top){
        this.reset();
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
