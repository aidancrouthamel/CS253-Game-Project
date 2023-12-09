const canvas = document.getElementById("canvas");
const ctx = getContext('2d');

class Player {
    constructor(){
        this.image = document.getElementById('player');
        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = 330;
        this.y = 550;
        this.minFrame = 0;
        this.maxFrame = 650;
    }
    draw (context, dx, dy){
        context.drawImage(this.image, this.x + dx, this.y + dy);
    }
    update (context, dx, dy){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw(ctx, dx, dy);
    }
}

class Obstacle {
    constructor(){
        this.image = document.getElementById('player');
        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = 330;
        this.y = 550;
        this.minFrame = 0;
        this.maxFrame = 650;
    }
    draw (context, dx, dy){
        context.drawImage(this.image, this.x + dx, this.y + dy);
    }
    spawn(amount, randX, spawnOn, dy) {
        if(spawnOn){
            for(let i = 0; i < amount; i++)
            {
                this.draw(ctx, randX, dy);
            }
        }
    }
    update (amount, randX, dy){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        spawn(amount, randX, dy);
    }
}

function animatePlayer(player)
{
    const LEFT_ARROW = 37, UP_ARROW = 38, RIGHT_ARROW = 39, DOWN_ARROW = 40; 
    document.addEventListener("keypress", (event) => {
        switch (event.code){
            case LEFT_ARROW:
                player.update(ctx, -1, 0);
                break;
            case RIGHT_ARROW:
                player.update(ctx, 1, 0);
                break;
            case UP_ARROW:
                player.update(ctx, 0, -1);
                break;
            case DOWN_ARROW:
                player.update(ctx, 0, -1);
                break;    
        }
    })
    requestAnimationFrame(animatePlayer);
}

function animateObstacles(obstacle, amount, gameOver, respawnInterval, updateSpeed) {
    var randX;
    while (!gameOver) {
        
        setTimeout(() => {

            randX = Math.random();
            setTimeout(() => {
                obstacle.update(amount, randx, 1);
            }, updateSpeed);

        }, respawnInterval)
    }
}