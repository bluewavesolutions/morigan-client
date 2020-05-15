import { singleton } from "tsyringe";

@singleton()
export class GameWindow {
    public dimensions() {
        const rect = document.getElementById('game_window').getBoundingClientRect();

        return { 
            width: rect.width, 
            height: rect.height 
        };
    }
}