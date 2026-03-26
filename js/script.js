// --- 1. ESTADO DO JOGO (Variáveis de controle) ---
const Game = {
    score: 0,
    highScore: localStorage.getItem('marioHighScore') || 0,
    isGameOver: false,
    gameSpeed: 2.0,
    pipePassed: false,
    loopInterval: null
};

// --- 2. ELEMENTOS DA UI (Seletores e atualizações visuais) ---
const UI = {
    mario: document.querySelector('.mario'),
    pipe: document.querySelector('.pipe'),
    score: document.querySelector('.score'),
    highScore: document.querySelector('.high-score'),
    restartBtn: document.querySelector('.restart-button'),

    init() {
        this.highScore.innerHTML = `HI ${Game.highScore}`;
    },

    updateScore(newScore) {
        this.score.innerHTML = newScore;
        if (newScore > Game.highScore) {
            this.highScore.classList.add('new-record');
            this.highScore.innerHTML = `HI ${newScore}`;
        }
    },

    applyGameOver(marioPos, pipePos, marioWidth) {
        this.pipe.style.animation = 'none';
        this.pipe.style.left = `${pipePos}px`;

        this.mario.style.animation = 'none';
        this.mario.style.bottom = `${marioPos}px`;
        this.mario.src = './assests/game-over.png';
        this.mario.style.width = (marioWidth * 0.6) + 'px';
        this.mario.style.marginLeft = (marioWidth * 0.3) + 'px';

        this.restartBtn.style.display = 'block';
    }
};

// --- 3. LÓGICA DE MOVIMENTO E REGRAS ---
const Actions = {
    jump() {
        if (Game.isGameOver) return;

        UI.mario.classList.remove('jump');
        void UI.mario.offsetWidth; // Force reflow aq
        UI.mario.classList.add('jump');

        setTimeout(() => UI.mario.classList.remove('jump'), 500);
    },

    updateDifficulty() {
        if (Game.score % 5 === 0 && Game.gameSpeed > 0.8) {
            Game.gameSpeed -= 0.1;
            UI.pipe.style.animationDuration = `${Game.gameSpeed}s`;
        }
    },
    checkCollision(marioBottom, pipeLeft) {
        const marioWidth = UI.mario.offsetWidth;
        const pipeHeight = UI.pipe.offsetHeight;

        const collisionWidth = marioWidth * 0.5;
        const collisionHeight = pipeHeight * 0.6;

        return pipeLeft <= collisionWidth && pipeLeft > 0 && marioBottom < collisionHeight;
    }
};

// --- 4. O LOOP PRINCIPAL ---
UI.init();

Game.loopInterval = setInterval(() => {
    const pipePosition = UI.pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(UI.mario).bottom.replace('px', '');

    // Lógica de Colisão
    if (Actions.checkCollision(marioPosition, pipePosition)) {
        Game.isGameOver = true;
        UI.applyGameOver(marioPosition, pipePosition, UI.mario.offsetWidth);

        if (Game.score > Game.highScore) {
            localStorage.setItem('marioHighScore', Game.score);
        }

        clearInterval(Game.loopInterval);
        return;
    }

    // Lógica de Pontuação
    if (pipePosition < 0 && !Game.pipePassed && !Game.isGameOver) {
        Game.score++;
        UI.updateScore(Game.score);
        Game.pipePassed = true;
        Actions.updateDifficulty();
    }

    if (pipePosition > 100) {
        Game.pipePassed = false;
    }
}, 10);

// --- 5. EVENT LISTENERS ---
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') Actions.jump();
});

UI.restartBtn.addEventListener('click', () => location.reload());

window.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('footer') && !e.target.closest('.restart-button')) {
        Actions.jump();
    }
});