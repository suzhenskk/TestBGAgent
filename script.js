const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('bestScore');
const statusText = document.getElementById('statusText');
const startBtn = document.getElementById('startBtn');

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

const GRAVITY = 0.45;
const JUMP_FORCE = -8;
const PIPE_WIDTH = 62;
const PIPE_GAP = 150;
const PIPE_SPEED = 2.5;
const PIPE_INTERVAL = 1500;

let bird;
let pipes;
let score;
let bestScore = Number(localStorage.getItem('flappyBestScore') || 0);
let gameRunning = false;
let gameOver = false;
let lastPipeTime = 0;
let animationId;

bestScoreEl.textContent = bestScore;

function resetGame() {
    bird = {
        x: 90,
        y: GAME_HEIGHT / 2,
        radius: 14,
        velocity: 0
    };

    pipes = [];
    score = 0;
    scoreEl.textContent = score;
    gameOver = false;
    lastPipeTime = 0;
    statusText.textContent = '游戏进行中...';
}

function startGame() {
    resetGame();
    gameRunning = true;
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
}

function flap() {
    if (!gameRunning) return;
    bird.velocity = JUMP_FORCE;
}

function spawnPipe() {
    const minTop = 60;
    const maxTop = GAME_HEIGHT - PIPE_GAP - 120;
    const topHeight = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;

    pipes.push({
        x: GAME_WIDTH,
        topHeight,
        counted: false
    });
}

function update(deltaTime) {
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;

    if (bird.y - bird.radius < 0 || bird.y + bird.radius > GAME_HEIGHT) {
        endGame();
        return;
    }

    if (performance.now() - lastPipeTime > PIPE_INTERVAL) {
        spawnPipe();
        lastPipeTime = performance.now();
    }

    pipes.forEach((pipe) => {
        pipe.x -= PIPE_SPEED;

        const hitTop =
            bird.x + bird.radius > pipe.x &&
            bird.x - bird.radius < pipe.x + PIPE_WIDTH &&
            bird.y - bird.radius < pipe.topHeight;

        const hitBottom =
            bird.x + bird.radius > pipe.x &&
            bird.x - bird.radius < pipe.x + PIPE_WIDTH &&
            bird.y + bird.radius > pipe.topHeight + PIPE_GAP;

        if (hitTop || hitBottom) {
            endGame();
        }

        if (!pipe.counted && pipe.x + PIPE_WIDTH < bird.x) {
            pipe.counted = true;
            score += 1;
            scoreEl.textContent = score;
        }
    });

    pipes = pipes.filter((pipe) => pipe.x + PIPE_WIDTH > -5);

    if (deltaTime > 100) {
        // 避免页面恢复时跳帧过大导致逻辑异常
        bird.velocity *= 0.9;
    }
}

function drawBackground() {
    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = '#86efac';
    ctx.fillRect(0, GAME_HEIGHT - 80, GAME_WIDTH, 80);
}

function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#facc15';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bird.x + 5, bird.y - 4, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#111827';
    ctx.fill();
}

function drawPipes() {
    ctx.fillStyle = '#16a34a';

    pipes.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, GAME_HEIGHT - pipe.topHeight - PIPE_GAP);
    });
}

function draw() {
    drawBackground();
    drawPipes();
    drawBird();
}

let lastFrame = performance.now();
function gameLoop(timestamp) {
    if (!gameRunning) return;

    const deltaTime = timestamp - lastFrame;
    lastFrame = timestamp;

    update(deltaTime);
    draw();

    if (!gameOver) {
        animationId = requestAnimationFrame(gameLoop);
    }
}

function endGame() {
    if (gameOver) return;

    gameOver = true;
    gameRunning = false;

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('flappyBestScore', String(bestScore));
        bestScoreEl.textContent = bestScore;
    }

    statusText.textContent = `游戏结束！得分 ${score}，点击“开始 / 重新开始”继续。`;
}

startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        if (!gameRunning && !gameOver) {
            startGame();
        }
        flap();
    }
});
canvas.addEventListener('pointerdown', flap);

// 初始渲染
resetGame();
draw();
