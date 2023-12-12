//const canvas = document.getElementById("canvas");
const canvas = new Image("/assets/backgrounded/background1.png");
const ctx = getContext('2d');

class Player {
    constructor(){
        this.image = new Image("/assets/regularsprites/ship1.png");
        //this.image = document.getElementById('player');
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
                switch(Math.floor(Math.random() * 9)){  //this is a lot.... it will randomly generate images for the obstacle
                    case 0:
                        this.image = new Image("/assets/regularsprites/earth.png");
                        break;
                    case 1:
                        this.image = new Image("/assets/regularsprites/meteor.png");
                        break;
                    case 2:
                        this.image = new Image("/assets/regularsprites/meteoralt.png");
                        break;
                    case 3:
                        this.image = new Image("/assets/regularsprites/meteortiny.png");
                        break;
                    case 4:
                        this.image = new Image("/assets/regularsprites/meteortinyalt.png");
                        break;
                    case 5:
                        this.image = new Image("/assets/regularsprites/moon.png");
                        break;
                    case 6:
                        this.image = new Image("/assets/regularsprites/ringplanet.png");
                        break;
                    case 7:
                        this.image = new Image("/assets/regularsprites/star.png");
                        break;
                    case 8:
                        this.image = new Image("/assets/regularsprites/ship2.png");
                        break;
                    default:
                        this.image = new Image("/assets/regularsprites/earth.png");
                        break;
                }
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
        playSound('/assets/sounds/space.mp3');
        setTimeout(() => {

            randX = Math.random();
            setTimeout(() => {
                obstacle.update(amount, randX, 1);
            }, updateSpeed);
            playSound('/assets/sounds/score.mp3');

        }, respawnInterval)
    }
}

function playSound(audio){ //plays a specific audio file
    if (audio.currentTime != 0){
        console.log('specified track already playing');  //sends console message in case of multiple calls of same audio file (debug)
    }
    else{
        let sound = new Audio(audio);
        sound.volume=.2;
        sound.play();
    }
    
}

function stopAudio(audio){  //Stops the specified audio file and resets the time to 0
    audio.pause();
    audio.currentTime= 0;
}

function loopAudio(audio){ // This is specific for the space.mp3 file but can be used for other files
    audio.pause();
    audio.currentTime=14;
    audio.play();
}