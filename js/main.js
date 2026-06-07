import { Game } from './game.js';
import { UI } from './ui.js';
import { AudioFX } from './audio.js';
import { Actions } from './actions.js';

// --- INICIALIZAÇÃO ---
UI.init();

// --- LOOP PRINCIPAL ---
Game.loopInterval = setInterval(() => {
    const pipePosition = UI.pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(UI.mario).bottom.replace('px', '');

    if (Actions.checkCollision(marioPosition, pipePosition)) {
        Game.isGameOver = true;
        AudioFX.play(AudioFX.gameOver);
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
        Actions.updateDifficulty(); 
        Game.pipePassed = true;
    }

    if (pipePosition > 100) {
        Game.pipePassed = false;
    }
}, 10);

// --- EVENTOS / CONTROLES ---
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') Actions.jump();
});

UI.restartBtn.addEventListener('click', () => location.reload());

window.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('footer') && !e.target.closest('.restart-button')) {
        Actions.jump();
    }
});