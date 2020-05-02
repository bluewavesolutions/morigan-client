import { EngineMediator } from "../../utils/EngineMediator";
import { OtherCharacter } from "../OtherCharacter";
import { IOtherCharacterMovedResponse } from "../../server/interfaces/responses/IOtherCharacterMovedResponse";
import { IRenderObject } from "../interfaces/IRenderObject";
import { IOtherCharacterServerModel } from "../../server/interfaces/serverModels/IOtherCharacterServerModel";
import { singleton } from "tsyringe";
import { Camera } from "../Camera";

@singleton()
export class OtherCharactersManager {
    private otherCharacters: OtherCharacter[] = [];

    constructor(
        private engineMediator: EngineMediator,
        private camera: Camera
    ) {
        this.engineMediator.registerHandler('OtherCharactersManager::Load', (data: IOtherCharacterServerModel) => {
            let findIndex = this.otherCharacters.findIndex(e => e.id == data.Id);
            if(findIndex >= 0) {
                return;
            }

            this.otherCharacters.push(new OtherCharacter(this.camera,
                data.Id, 
                data.Nick, 
                data.Outfit,
                data.PositionX, 
                data.PositionY));
        });

        this.engineMediator.registerHandler('OtherCharactersManager::Moved', (data: IOtherCharacterMovedResponse) => {
            let character = this.otherCharacters.find((e) => e.id == data.Id) as OtherCharacter;
            character.positionX = data.PositionX;
            character.positionY = data.PositionY;     
        });
    }

    public move(direction: string) {
        this.otherCharacters.map(e => e.move(direction));
    }

    public getCharacterRenderObjects() : IRenderObject[] {
        return this.otherCharacters.map(e => e.getRenderereObject());
    }
}