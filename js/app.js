const playerInitialPosition = {x: 202, y: 386}
const enemyInitialPosition = {x: -101, y: 303}
const gameBoundaries = {
    left: 0, right: 404, top: 54, bottom: 386
}
const block = {width: 101, height: 83}

// Enemies our player must avoid
class Enemy {
    /**
     * @description Enemy类的构造函数，初始化enemy的位置和图片资源路径
     * @constructor
     */
    constructor(){
        this.reset();
        this.sprite = 'images/enemy-bug.png';
    }
    /**
     * @description 随机生成enemy的上下位置和速度并重设位置和速度
     */
    reset(){
        this.speed = Math.random() * 300 + 50;
        this.x = enemyInitialPosition.x;
        this.y = enemyInitialPosition.y -
        (parseInt(3 * Math.random()) + 1) * block.height;
    }
    /**
     * @description 使用速度和间隔时间更新enemy的位置并进行检测碰撞，
     * 如果enemy超出游戏边界则重置它的位置
     * @param {number} dt
     */
    update(dt){
        this.x += this.speed * dt;
        this.checkCollisions();
        if (this.x > gameBoundaries.right + block.width) {
            this.reset();
        }
    }
    /**
     * @description 将enemy呈现在屏幕上
     */
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    /**
     * @description 检测enemy与玩家之间的碰撞，如果enemy和玩家之间的x轴距离
     * 以及y轴距离都过小则认为它们之间发生了碰撞
     */
    checkCollisions(){
        if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50) {
            player.reset();
        }
    }

};

class Player {
    /**
     * @description Player类的构造函数，初始化player的位置和图片资源路径
     * @constructor
     */
    constructor(){
        this.reset();
        this.sprite = 'images/char-boy.png';
    }
    /**
     * @description 重设player的位置为初始位置
     */
    reset(){
        this.x = playerInitialPosition.x;
        this.y = playerInitialPosition.y;
    }
    update(){
    }
    /**
     * 将player呈现在屏幕上
     */
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    /**
     * @description 根据按键更新player坐标，为了防止player超出游戏区域
     * 一旦player超出边界范围则重设为边界位置，超出上边界判断为游戏胜利，
     * 重设player位置
     * @param {string} key
     */
    handleInput(key){
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
        if (this.x > gameBoundaries.right) {
            this.x = gameBoundaries.right;
        }
        if (this.x < gameBoundaries.left) {
            this.x = gameBoundaries.left;
        }
        if (this.y > gameBoundaries.bottom) {
            this.y = gameBoundaries.bottom;
        }
        if (this.y < gameBoundaries.top) {
            this.reset();
            alert('You Win!');
        }
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
const player = new Player();


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
