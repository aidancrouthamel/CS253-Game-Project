
const playerSprite = document.getElementById("player");
playerSprite.style.left = "250px";
playerSprite.style.top = "250px";
playerSprite.style.height = "50px";
playerSprite.style.width = "40px";

// const obstacleSprite = document.getElementById("obstacle");
// obstacleSprite.style.height = "50px";
// obstacleSprite.style.width = "50px";
var score = 0;
var gameOver = false;

class Player {
    constructor(){
        this.image = new Image();
        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = 330;
        this.y = 550;
        this.minFrameX = 0;
        this.maxFrameX = 830;
        this.minFrameY = 0;
        this.maxFrameY = 450 - 50; // backscreen is 80 tall
    }
}
var playerObject = new Player();


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
        this.maxFrameX = 830;
        this.minFrameY = 0;
        this.maxFrameY = 450;
    }
    
}
var obstacleObject = new Obstacle();
//important clamping function for bounds
const clamp = (val, min, max) => {
    if(val < min){
        return min;
    }
    else if(val > max){
        return max;
    }
    else{
        return val
    }
};
const inRange = (val, min, max) => {
    if(val < min){
        return false;
    }
    else if(val > max){
        return false;
    }
    else{
        return true;
    }
}
const collision = (object1, object2) => {
    var inRangeLeft = inRange(parseFloat(object1.style.left), parseFloat(object2.style.left), parseFloat(object2.style.left) + parseFloat(object2.style.width));
    var inRangeTop = inRange(parseFloat(object1.style.top), parseFloat(object2.style.top), parseFloat(object2.style.top) + parseFloat(object2.style.height));
    if(inRangeLeft && inRangeTop){
        return true;
    }
    else {
        return false;
    }
}

function playerUpdate(dx, dy) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //playerDraw(player, ctx, dx, dy);
    var updatedPositionX = clamp(parseFloat(playerSprite.style.left) + dx, playerObject.minFrameX, playerObject.maxFrameX),
    updatedPositionY = clamp(parseFloat(playerSprite.style.top) + dy, playerObject.minFrameY, playerObject.maxFrameY);

    playerSprite.style.left = `${clamp(parseFloat(playerSprite.style.left) + dx, playerObject.minFrameX, playerObject.maxFrameX)}px`;
    playerSprite.style.top = `${clamp(parseFloat(playerSprite.style.top) + dy, playerObject.minFrameY, playerObject.maxFrameY)}px`;

    console.log(`playerSprite.style.top = ${playerSprite.style.top}, playerSprite.style.left = ${playerSprite.style.left}`);
}


function animateObstacles(amount, respawnInterval, updateSpeed) {
    var randsX = []
    //initial
    for(var i = 0; i < amount; i++) {
        randsX.push(clamp(Math.random() * 1000 + obstacleObject.minFrameX, 
        obstacleObject.minFrameX, obstacleObject.maxFrameX));
    }
    for(var i = 0; i < amount; i++) {
        
        var obstacleSprite = document.createElement("img");
        obstacleSprite.id = `obstacle ${i}`;
        obstacleSprite.style.height = "50px";
        obstacleSprite.style.width = "25px";
        obstacleSprite.style.position = "absolute";
        obstacleSprite.style.left = `${randsX[i]}px`;
        obstacleSprite.style.top = `${clamp(randsX[i]/15, obstacleObject.minFrameY, obstacleObject.maxFrameY)}px`;
        obstacleSprite.src = "static/meteor.png";

        document.getElementsByClassName("game")[0].appendChild(obstacleSprite);
    }



    //updating functions
    var respawn_function = setInterval(()=>{
        if(randsX.length > 0) {
            randsX = [] //reset rands
        }
        for(var i = 0; i < amount; i++) {
            randsX.push(clamp(Math.random() * 1000 + obstacleObject.minFrameX, 
                obstacleObject.minFrameX, obstacleObject.maxFrameX));
        }
        for(var i = 0; i < amount; i++) {

            var obstacleSprite = document.getElementById(`obstacle ${i}`);
            obstacleSprite.style.left = `${randsX[i]}px`;
            obstacleSprite.style.top = `${clamp(randsX[i]/15, obstacleObject.minFrameY, obstacleObject.maxFrameY)}px`;
        }
    }, respawnInterval);
    var move_obstacles = setInterval(() => {
        //move obstacles
        for(var i = 0; i < amount; i++){
            var obstacle = document.getElementById(`obstacle ${i}`);//get obstacle
            if(obstacle != null) {
                obstacle.style.top = `${clamp(parseInt(obstacle.style.top) + 1, obstacleObject.minFrameY, obstacleObject.maxFrameY)}px`; //move by 1 px
            }
        }
        //check for collisions
        for(var i = 0; i < amount; i++){ 
            var obstacle = document.getElementById(`obstacle ${i}`);  
            if(collision(obstacle, playerSprite)){
                alert("Game Over");
                gameOver = true;
            }
        } 
    }, updateSpeed);

}


document.addEventListener('keydown', function(event) {
    const LEFT_ARROW = 37, UP_ARROW = 38, RIGHT_ARROW = 39, DOWN_ARROW = 40, X = 88;
    console.log(`event.code = ${event.code}`);
    //if(player.x < maxFrame){}    
    if(event.code === "ArrowLeft"){
        playerUpdate(-5, 0);
    }
    if(event.code === "ArrowRight"){
        playerUpdate(5, 0);
    }
    if(event.code === "ArrowUp"){
        playerUpdate(0, -5);
    }
    if(event.code === "ArrowDown"){
        playerUpdate(0, 5);
    }
    if (event.code == "x"){
        
    }

});

animateObstacles(10, 2000, 3);
setInterval(()=> {
    if(!gameOver)
    {
        score++;
        document.getElementById("score").innerText = `The longer you survive the higher you score! Score: ${score}`;
    }
    else{
        score = 0;
        gameOver = false;
    }
}, 1)