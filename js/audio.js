export const AudioFX = {
    jump: new Audio('./assets/jump.mp3'), 
    gameOver: new Audio('./assets/game-over.mp3'),
    play(sound) {
        sound.currentTime = 0; 
        sound.play().catch(() => {});
    }
};