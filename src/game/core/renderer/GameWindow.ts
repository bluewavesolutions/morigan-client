export class GameWindow {
    public dimensions() {
        const gameWindow = document.getElementById('game_window');
        if(gameWindow === null) {
            throw new Error('Game window element not found');
        }

        const rect = gameWindow.getBoundingClientRect();

        return { 
            width: rect.width, 
            height: rect.height 
        };
    }
}