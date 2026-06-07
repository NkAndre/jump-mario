import { Game } from './game.js';
import { UI } from './ui.js';
import { AudioFX } from './audio.js';

export const Actions = {
    jump() {
        if (Game.isGameOver) return;
        AudioFX.play(AudioFX.jump);
        UI.mario.classList.remove('jump');
        void UI.mario.offsetWidth; 
        UI.mario.classList.add('jump');
        setTimeout(() => UI.mario.classList.remove('jump'), 500);
    },

    updateDifficulty() {
        if (Game.score > 0 && Game.score % 5 === 0 && Game.gameSpeed > 1.2) {
            Game.gameSpeed -= 0.05; 
            UI.pipe.style.animationDuration = `${Game.gameSpeed}s`;
            console.log(`Dificuldade aumentada! Velocidade atual: ${Game.gameSpeed.toFixed(2)}s`);
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