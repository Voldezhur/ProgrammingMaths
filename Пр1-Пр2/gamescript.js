let canvasHeight = 400;
let canvasWidth = 600;

// Параметры шариков
let ballSpeed = 10;
let ballSize = 60;

let gameRunning = false;

let gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.backgroundColor = "lightblue";
        this.context = this.canvas.getContext("2d");
        document.getElementById("mainSection").appendChild(this.canvas);
    }
}


let player;

let players = [];

let playerYPosition = 200;
let playerXPosition = 400;

let interval = setInterval(updateCanvas, 20);

let gameBeginText = document.createElement('h1');
gameBeginText.classList.add('sectionTitle');
gameBeginText.textContent = "Для начала игры нажмите пробел";
document.getElementById("mainSection").appendChild(gameBeginText);

// Получение ввода с клавиатуры
document.addEventListener('keydown', (event) => {
    let code = event.code;

    if (code == "Space") {
        if (gameRunning == false) {
            gameRunning = true;
            gameBeginText.remove();
            startGame();
        }

        else {
            let newPlayer = new createPlayer();
            players.push(newPlayer);
        }
    }
}, false);

// Создание шарика
function createPlayer() {
    this.width = ballSize;
    this.height = ballSize;
    this.color = Math.floor(Math.random()*16777215).toString(16);  // Генерируется случайный цвет
    this.x = Math.ceil(Math.random() * (canvasWidth - this.width));
    this.y = Math.ceil(Math.random() * (canvasHeight - this.height));

    this.yVelocity = ballSpeed;
    this.xVelocity = ballSpeed;

    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "#" + this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.movePlayer = function() {
        this.y += this.yVelocity;
        this.x += this.xVelocity;

        var ground = canvasHeight - this.height;
        var ceiling = 0;
        var rightWall = canvasWidth - this.width;
        var leftWall = 0;

        if (this.y > ground || this.y < ceiling) {
            this.yVelocity *= -1;
        }
        
        if (this.x > rightWall || this.x < leftWall) {
            this.xVelocity *= -1;
        }
    }

    this.checkCollision = function() {
        players.forEach(player => {
            if (this.x > player.x && this.x < player.x + player.width && this.y > player.y && this.y < player.y + player.height)
            {
                // if (this.xVelocity == player.xVelocity)
                // {
                //     this.yVelocity *= -1;
                //     player.yVelocity *= -1;
                // }
                
                // if (this.yVelocity == player.yVelocity)
                // {
                //     this.xVelocity *= -1;
                //     player.xVelocity *= -1;
                // }

                // else
                // {
                    this.xVelocity *= -1;
                    this.yVelocity *= -1;
    
                    player.xVelocity *= -1;
                    player.yVelocity *= -1;
                // }
            }
        });
    }
}

// function update the canvas
function updateCanvas() {    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    players.forEach(player => {
        player.checkCollision();
        player.movePlayer();
        player.draw();
    });
}

// start game
function startGame() {
    gameCanvas.start();
    player = new createPlayer();
    players.push(player);
}