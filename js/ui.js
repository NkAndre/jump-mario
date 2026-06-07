import { Game } from './game.js';

export const UI = {
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
        this.mario.src = './assets/game-over.png'; 
        this.mario.style.width = (marioWidth * 0.6) + 'px';
        this.mario.style.marginLeft = (marioWidth * 0.3) + 'px';

        this.restartBtn.style.display = 'block';
    }
};