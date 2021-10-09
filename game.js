const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');



startScreen.addEventListener('click', start);
let player = { speed: 5, score: 0 };

const keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false }

//for key movement function
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}


//function for collision
function collide(myJet, enemyJet) {
    myJetRect = myJet.getBoundingClientRect();          //this function used for get position of my Jet
    enemyJetRect = enemyJet.getBoundingClientRect();      //this function used for get position of enemy Jet

    return !((myJetRect.top > enemyJetRect.bottom) || (myJetRect.bottom < enemyJetRect.top) || (myJetRect.left > enemyJetRect.right)
        || (myJetRect.right < enemyJetRect.left))
}



//function for game over
function gameOver() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your Score is: " + player.score + "<br>Press Here to Play Again";
    stopMusic();
}



//function for moving enemy jets
function moveEnemy(jet) {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (value) {

        if (collide(jet, value)) {
            gameOver();
        }

        if (value.y >= 750) {
            value.y = -300;   // there is total 3 enemy jet,so difference (distance) of all the three jets is this
            value.style.left = Math.floor(Math.random() * 350) + "px";
        }
        value.y += player.speed;
        value.style.top = (value.y + "px");
    });
}



//after start the game
function gamePlay() {
    let jet = document.querySelector('.jet');
    let road = gameArea.getBoundingClientRect();

    //car function in the road
    if (player.start) {


        //function call for moving enemy jets
        moveEnemy(jet);

        if (keys.ArrowUp && player.y > (road.top + 150)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 100)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 60)) { player.x += player.speed }

        jet.style.top = player.y + "px";
        jet.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);

        //to show score card
        player.score++;
        let finalScore = player.score - 1; //we subtract 1,coz if we don't then we can see score is always 1 less from opiginal score
        score.innerText = "Your Score: " + finalScore;
    }

}

//when click start the game
function start() {

    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    if(player.start = true){
        playMusic();
    }
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    //jet element create
    let jet = document.createElement('div');
    jet.setAttribute('class', 'jet');
    gameArea.appendChild(jet);

    //for jet movement
    player.x = jet.offsetLeft;
    player.y = jet.offsetTop;



    // for creating enemy jet
    for (x = 0; x < 3; x++) {
        let enemyJet = document.createElement('div');
        enemyJet.setAttribute('class', 'enemy');
        enemyJet.y = ((x + 1) * 350) * -1;
        enemyJet.style.top = (enemyJet.y + "px");
        enemyJet.style.backgroundColor = randomColor();  //randomColor function declared in the bottom of this file
        enemyJet.style.left = Math.floor(Math.random() * 450) + "px";
        gameArea.appendChild(enemyJet);
    }


    //for music play
    playMusic();
}

// function for random color of enemy jets
function randomColor() {
    function c() {
        let code = Math.floor(Math.random() * 256).toString(16);  //we convert to string because we can't concatenate numbers
        return ("0" + String(code)).substr(-2);
    }
    return "#" + c() + c() + c();
}

//for music function
var audio = new Audio("sound.mp3");

function playMusic(){
    audio.loop=true;
    audio.play();
}
function stopMusic(){
    audio.pause();
}







