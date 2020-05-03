import { OtherCharacter } from "../components/OtherCharacter";
import { IOtherCharacterMovedResponse } from "../communication/interfaces/responses/IOtherCharacterMovedResponse";
import { IRenderObject } from "../core/renderer/interfaces/IRenderObject";
import { IOtherCharacterServerModel } from "../communication/interfaces/serverModels/IOtherCharacterServerModel";
import { singleton } from "tsyringe";
import { Camera } from "../components/Camera";
import { Mediator } from "../core/events/Mediator";
import { AnimationManager } from "../core/animations/AnimationManager";

@singleton()
export class OtherCharactersManager {
    private otherCharacters: OtherCharacter[] = [];

    constructor(
        private mediator: Mediator,
        private animationManager: AnimationManager,
        private camera: Camera
    ) {
        this.mediator.registerHandler('OtherCharactersManager::Load', (data: IOtherCharacterServerModel) => {
            let findIndex = this.otherCharacters.findIndex(e => e.id == data.Id);
            if(findIndex >= 0) {
                return;
            }

            this.otherCharacters.push(new OtherCharacter(this.camera,
                this.animationManager,
                data.Id, 
                data.Nick, 
                data.Outfit,
                data.PositionX, 
                data.PositionY));
        });

        this.mediator.registerHandler('OtherCharactersManager::Moved', (data: IOtherCharacterMovedResponse) => {
            let character = this.otherCharacters.find((e) => e.id == data.Id) as OtherCharacter;
            character.move(data.PositionX, data.PositionY); 
        });
    }

    public getCharacterRenderObjects() : IRenderObject[] {
        return this.otherCharacters.map(e => e.getRenderereObject());
    }
}