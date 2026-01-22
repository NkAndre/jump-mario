const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const restartButton = document.querySelector('.restart-button');
const highScoreElement = document.querySelector('.high-score');

let score = 0;
let pipePassed = false;
let isGameOver = false;
let gameSpeed = 2.0;

// Carrega o recorde da memória do navegador
let highScore = localStorage.getItem('marioHighScore') || 0;
highScoreElement.innerHTML = `HI ${highScore}`;

const jump = () => {
    if (isGameOver) return;

    mario.classList.remove('jump');
    void mario.offsetWidth; // Reset de animação
    mario.classList.add('jump');
    
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const updateDifficulty = () => {
    // Reduz o tempo da animação (mínimo 0.8s)
    if (gameSpeed > 0.8) {
        gameSpeed -= 0.05;
        pipe.style.animationDuration = `${gameSpeed}s`;
    }
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    const marioWidth = mario.offsetWidth;
    const pipeHeight = pipe.offsetHeight;

    // LÓGICA DE PONTUAÇÃO
    if (pipePosition < 0 && !pipePassed && !isGameOver) {
        score++;
        scoreElement.innerHTML = score;
        pipePassed = true;
        updateDifficulty();

        // Se bater o recorde enquanto joga, faz o HI piscar
        if (score > highScore) {
            highScoreElement.classList.add('new-record');
            highScoreElement.innerHTML = `HI ${score}`;
        }
    }

    if (pipePosition > 100) { 
        pipePassed = false;
    }

    // LÓGICA DE COLISÃO
    const collisionWidth = marioWidth * 0.5; 
    const collisionHeight = pipeHeight * 0.6;

    if (pipePosition <= collisionWidth && pipePosition > 0 && marioPosition < collisionHeight) {
        isGameOver = true;
        
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './assests/game-over.png';
        mario.style.width = (marioWidth * 0.6) + 'px';
        mario.style.marginLeft = (marioWidth * 0.3) + 'px';

        // SALVAR RECORDE NA MEMÓRIA
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('marioHighScore', highScore);
        }

        restartButton.style.display = 'block'; 
        clearInterval(loop);
    }
}, 10);

// RESTART
restartButton.addEventListener('click', () => {
    location.reload();
});

// CONTROLES
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') jump();
});

window.addEventListener('pointerdown', (e) => {
    // Não pula se clicar nos links ou no botão de restart
    if (!e.target.closest('footer') && !e.target.closest('.restart-button')) {
        jump();
    }
}, { passive: false });

document.addEventListener('touchstart', (e) => {
    if (e.target.tagName !== 'A' && e.target !== restartButton) {
        e.preventDefault();
    }
}, { passive: false });