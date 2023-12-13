
const playerSprite = document.getElementById("player");
//playerSprite.style.left = "50px";
//playerSprite.style.top = "50px";
playerSprite.style.height = "50px";
playerSprite.style.width = "50px";

// const obstacleSprite = document.getElementById("obstacle");
// obstacleSprite.style.height = "50px";
// obstacleSprite.style.width = "50px";


class Player {
    constructor(){
        this.image = new Image();
        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = 330;
        this.y = 550;
        this.minFrame = 0;
        this.maxFrame = 750;
        this.minFrameY = 0;
        this.maxFrameY = 550;
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
        this.minFrameX = 0;
        this.maxFrameX = 750;
        this.minFrameY = 0;
        this.maxFrameY = 550
    }
    
}


function playerUpdate(dx, dy) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //playerDraw(player, ctx, dx, dy);
    
    playerSprite.style.top = `${parseFloat(playerSprite.style.top) + dy}`;
    playerSprite.style.left = `${parseFloat(playerSprite.style.left) + dx}`;
    console.log(`playerSprite.style.top = ${playerSprite.style.top}, playerSprite.style.left = ${playerSprite.style.left}`);
}


function animateObstacles(amount, gameOver, respawnInterval, updateSpeed) {
    var spawns = 0;
    var respawn_function = setInterval(()=>{
        for(var i = 0; i < amount; i++) {
            var randX = Math.random() * 250;
            var obstacleSprite = document.createElement("img");
            obstacleSprite.id = `obstacle ${i}s${spawns}`;
            obstacleSprite.style.height = "50px";
            obstacleSprite.style.width = "50px";
            obstacleSprite.style.position = "relative";
            obstacleSprite.style.left = `${randX}px`;
            obstacleSprite.style.top = `${randX/2}px`;
            obstacleSprite.src = "static/meteor.png";
    
            document.getElementsByClassName("game")[0].appendChild(obstacleSprite);
        }
        spawns++;
    }, respawnInterval);
    

    var position_log = []
    var move_obstacles = setInterval(() => {
        //animate obstacle here
        for(var i = 0; i < amount; i++) {position_log.push([]);}
        
        for(var i = 0; i < amount; i++){
            var obstacle = document.getElementById(`obstacle ${i}s${spawns}`);//get obstacle
            if(obstacle != null) {
                obstacle.style.top = `${parseInt(obstacle.style.top) + 1}px`; //move by 5 px
                position_log[i].push(obstacle.style.top);
            }
        }
        
    }, updateSpeed);
    console.log(position_log);

    var despawn_function = setTimeout(() => {
        if (document.getElementsByClassName("game")[0].childElementCount > 1)
        {
            for(var i = 0; i < amount; i++){
                var node = document.getElementById(`obstacle ${i}s${spawns - 1}`);  
                if (node != null){
                    node.parentNode.removeChild(node)
                }
            }
        }//remove old children
    }, respawnInterval);
}

var gameOver = false;
document.addEventListener('keydown', function(event) {
    const LEFT_ARROW = 37, UP_ARROW = 38, RIGHT_ARROW = 39, DOWN_ARROW = 40, X = 88;
    console.log(`event.code = ${event.code}`);
    //if(player.x < maxFrame){}    
    if(event.code === "ArrowLeft"){
        playerUpdate(-5, 0);
        console.log("left arrow");
    }
    if(event.code === "ArrowRight"){
        playerUpdate(5, 0);
        console.log("right arrow");
    }
    if(event.code === "ArrowUp"){
        playerUpdate(0, -5);
        console.log("up arrow");
    }
    if(event.code === "ArrowDown"){
        playerUpdate(0, 5);
        console.log("down arrow");
    }
    if (event.code == "x"){
        gameOver = true;
    }

});

animateObstacles(10, gameOver, 1000, 10);

