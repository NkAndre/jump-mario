export const Game = {
    score: 0,
    highScore: localStorage.getItem('marioHighScore') || 0,
    isGameOver: false,
    gameSpeed: 2.0,
    pipePassed: false,
    loopInterval: null
};