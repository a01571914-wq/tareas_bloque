"use strict";

const canvasWidth = 800;
const canvasHeight = 600;

let ctx;
let game;
let oldTime = 0;

let paddleSpeed = 0.6;
let ballSpeed = 0.5;

class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color);
        this.velocity = new Vector(0, 0);
    }

    update(deltaTime) {
        this.velocity = this.velocity.normalize().times(ballSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    reset() {
        this.position = new Vector(canvasWidth / 2, canvasHeight - 60);
        this.velocity = new Vector(0, 0);
    }

    serve() {
        let angle = Math.random() * Math.PI / 2 + Math.PI / 4;
        this.velocity.x = Math.cos(angle);
        this.velocity.y = -Math.sin(angle);
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color);
        this.velocity = new Vector(0, 0);

        this.motion = {
            left: { axis: "x", sign: -1 },
            right: { axis: "x", sign: 1 }
        };

        this.keys = [];
    }

    update(deltaTime) {
        this.velocity.x = 0;

        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }

        this.velocity = this.velocity.normalize().times(paddleSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clamp();
    }

    clamp() {
        if (this.position.x - this.halfSize.x < 0)
            this.position.x = this.halfSize.x;

        if (this.position.x + this.halfSize.x > canvasWidth)
            this.position.x = canvasWidth - this.halfSize.x;
    }
}

class Block extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color);
        this.destroyed = false;
        this.hp = 1; 
    }

    hit() {
        this.hp--;
        if (this.hp <= 0) {
            this.destroyed = true;
        }
    }

    draw(ctx) {
        if (!this.destroyed) {
            super.draw(ctx);
        }
    }
}

class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();

        this.ping = document.createElement("audio");
        this.ping.src = "../assets/audio/4387__noisecollector__pongblipe4.wav";

        this.lives = 3;
        this.gameOver = false;
        this.win = false;
    }

    initObjects() {
        this.paddle = new Paddle(
            new Vector(canvasWidth / 2, canvasHeight - 30),
            120, 20, "green"
        );

        this.ball = new Ball(
            new Vector(canvasWidth / 2, canvasHeight - 60),
            20, 20, "red"
        );

        this.blocks = [];
        this.rows = 8;
        this.cols = 11;
        this.blockWidth = 60;
        this.blockHeight = 20;
        this.gap = 10;

        this.blocksDestroyed = 0;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = j * (this.blockWidth + this.gap) + this.blockWidth / 2 + this.gap;
                let y = i * (this.blockHeight + this.gap) + this.blockHeight / 2 + 50;

                let block = new Block(
                    new Vector(x, y),
                    this.blockWidth,
                    this.blockHeight,
                    "blue"
                );

                this.blocks.push(block);
            }
        }
    }

 
    resetGame() {
        this.lives = 3;
        this.gameOver = false;
        this.win = false;
        this.blocksDestroyed = 0;

        this.ball.reset();

        this.blocks = [];

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = j * (this.blockWidth + this.gap) + this.blockWidth / 2 + this.gap;
                let y = i * (this.blockHeight + this.gap) + this.blockHeight / 2 + 50;

                let block = new Block(
                    new Vector(x, y),
                    this.blockWidth,
                    this.blockHeight,
                    "blue"
                );

                this.blocks.push(block);
            }
        }
    }

    draw(ctx) {
        this.paddle.draw(ctx);
        this.ball.draw(ctx);

        for (let block of this.blocks) {
            block.draw(ctx);
        }

        ctx.font = "20px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Blocks: " + this.blocksDestroyed, 20, 30);
        ctx.fillText("Lives: " + this.lives, 680, 30);

        if (this.gameOver) {
            ctx.font = "50px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("GAME OVER", 250, 300);
        }

        if (this.win) {
            ctx.font = "50px Arial";
            ctx.fillStyle = "green";
            ctx.fillText("YOU WIN!", 270, 300);
        }


    }

    update(deltaTime) {
        if (this.gameOver || this.win) return;

        this.paddle.update(deltaTime);
        this.ball.update(deltaTime);

        if (this.ball.position.x - this.ball.halfSize.x < 0 ||
            this.ball.position.x + this.ball.halfSize.x > canvasWidth) {
            this.ball.velocity.x *= -1;
        }

        if (this.ball.position.y - this.ball.halfSize.y < 0) {
            this.ball.velocity.y *= -1;
        }

        if (this.ball.position.y + this.ball.halfSize.y > canvasHeight) {
            this.lives--;
            this.ball.reset();

            if (this.lives <= 0) {
                this.gameOver = true;
            }
        }

        if (boxOverlap(this.ball, this.paddle)) {
            this.ball.velocity.y *= -1;
            this.ping.play();
        }

        for (let block of this.blocks) {
            if (!block.destroyed && boxOverlap(this.ball, block)) {
                block.hit();
            
                if (block.destroyed) {
                    this.blocksDestroyed++;
            
                    if (Math.random() < 0.2) {
                        let filaY = block.position.y;
            
                
                        for (let b of this.blocks) {
                            if (!b.destroyed && b.position.y === filaY) {
                                b.color = "orange";
                            }
                        }
            
                        
                        setTimeout(() => {
                            for (let b of this.blocks) {
                                if (!b.destroyed && b.position.y === filaY) {
                                    b.destroyed = true;
                                    this.blocksDestroyed++;
                                }
                            }
                        }, 200); 
                    }
                }
            
                this.ball.velocity.y *= -1;
                this.ping.play();
            }
        }

        if (this.blocksDestroyed === this.blocks.length) {
            this.win = true;
        }
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'a') this.addKey('left');
            if (event.key === 'd') this.addKey('right');

           
            if (event.code === 'Space') {
                    this.ball.serve();
                
            }

        
            
        });

        window.addEventListener('keyup', (event) => {
            if (event.key === 'a') this.delKey('left');
            if (event.key === 'd') this.delKey('right');
        });
    }

    addKey(direction) {
        if (!this.paddle.keys.includes(direction)) {
            this.paddle.keys.push(direction);
        }
    }

    delKey(direction) {
        const index = this.paddle.keys.indexOf(direction);
        if (index !== -1) {
            this.paddle.keys.splice(index, 1);
        }
    }
}

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx = canvas.getContext('2d');

    game = new Game();
    drawScene(0);
}


function drawScene(newTime) {
    let deltaTime = newTime - oldTime;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);
    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
