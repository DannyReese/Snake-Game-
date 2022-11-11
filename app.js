let gamebored = document.getElementById('grid');
let cells = document.getElementsByClassName("cell");
let startButton = document.getElementById('start');
let controlButton = document.getElementById('control');
let scoreText = document.getElementById('scoreText');
let highScoreText = document.getElementById('highScore-text')
let controlPopup = document.getElementById('popup-container');
let closeControls = document.getElementById('close-pop-up');
let youDied = document.getElementById('dies');
let tryAgain = document.getElementById("close-dies-pop-up-button")
let snake=[]; 
let direction = 1;
let interval = 0;
let intervalTime = 0;
let width = 20;
let speed = .8;
let score = 0;
let currentScore; 

function setBored(){
    scoreText.innerText = "Press Start"
    for(let i = 0 ; i < 400 ; i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')
        gamebored.appendChild(cell)
    }
};

function applePlacer(cells){
        appleIndex = Math.floor(Math.random()* cells.length);
        cells[appleIndex].classList.add('apple');
        if(cells[appleIndex].classList.contains('snake')){
            cells[appleIndex].classList.add('apple');
        }
 };
  
function eatApple(cells,tail){
        if(cells[snake[0]].classList.contains('apple')){
            cells[snake[0]].classList.remove('apple');
            cells[tail].classList.add('snake');
            snake.push(tail);
            ++score;
            scoreText.innerText = score;
            applePlacer(cells);
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(deadOrAlive, intervalTime);
        }

};

function moveSnake(){
    let tail = snake.pop();
    cells[tail].classList.remove('snake');
    snake.unshift(snake[0] + direction);
    eatApple(cells,tail);
    cells[snake[0]].classList.add('snake');
};

function isDead(cells){
    if(
        (snake[0] + width >= cells.length && direction === width)||
        (snake[0] % width === width - 1 && direction === 1)||
        (snake[0]% width === 0 && direction === -1)||
        (snake[0] - width <= 0 && direction === -width)||
        cells[snake[0] + direction].classList.contains('snake')
        ){
        return true;
    }else{
        return false;
    }
};

let deadOrAlive = ()=>isDead(cells)?gameOver():moveSnake();
  
function addSnake(){for (let snakes of snake){
                         if(cells[snakes]){
                            cells[snakes].classList.add('snake')
                        }
                    }
};

function startGame(){
    let cells = document.getElementsByClassName("cell")
    applePlacer(cells);
    scoreText.innerText = score;
    intervalTime = 800;
    direction = 1;
    snake = [2,1,0];
    addSnake();
    interval = setInterval(deadOrAlive,intervalTime);
};

function removeSnake(){ for(let i = 0 ; i < cells.length; i++){
                            cells[i].classList.remove('snake')
                        }
};

function checkHighscore(score, currentScore = 0 ){
    let highscore = (score > currentScore)?score:currentScore;
    return highscore;
};

function gameOver(){
    currentScore = checkHighscore(score,currentScore)
    highScoreText.innerText = `Best Run: ${currentScore}`
    score = 0;
    snake = [];
    removeSnake();
    cells[appleIndex].classList.remove('apple');
    youDied.classList.remove('dies-pop-up-off');
    youDied.classList.add('dies-pop-up');
    scoreText.innerText = "Press Start";
    return clearInterval(interval);
};

function closePopUp(){
    let youDied = document.getElementById('dies');
    youDied.classList.remove('dies-pop-up');
    youDied.classList.add('dies-pop-up-off');
};

document.addEventListener('keypress',(event)=>{
    if(event.key === 'd' ){
        direction = 1;
    }else if (event.key === 'w'){
        direction = - width;
    }else if (event.key === 'a'){
        direction = -1;
    }else if( event.key === 's'){
        direction = + width;
    }else if(event.key === 'p'){
        clearInterval(interval);
    }else if(event.key === 'r'){
        clearInterval(interval);
        interval = setInterval(deadOrAlive, intervalTime);
    }
});

startButton.addEventListener('click',()=> snake.length||startGame());

tryAgain.addEventListener('click',closePopUp);

controlButton.addEventListener("click",()=>{
    controlPopup.classList.add('controls-pop-up-on');

    closeControls.addEventListener('click',()=>{
        controlPopup.classList.remove('controls-pop-up-on');
        controlPopup.classList.add('controls-pop-up-off');
        
    });
});

setBored();

 
