import { EngineMediator } from "../../utils/EngineMediator";
import { OtherCharacter } from "../OtherCharacter";
import { IOtherCharacterMovedResponse } from "../../server/interfaces/responses/IOtherCharacterMovedResponse";
import { IRenderObject } from "../interfaces/IRenderObject";
import { IOtherCharacterServerModel } from "../../server/interfaces/serverModels/IOtherCharacterServerModel";
import { Character } from "../Character";
import { singleton } from "tsyringe";

@singleton()
export class OtherCharactersManager {
    private otherCharacters: OtherCharacter[] = [];

    constructor(
        private engineMediator: EngineMediator,
        private character: Character
    ) {
        this.engineMediator.registerHandler('OtherCharactersManager::Load', (data: IOtherCharacterServerModel) => {
            let findIndex = this.otherCharacters.findIndex(e => e.id == data.Id);
            if(findIndex >= 0) {
                return;
            }

            this.otherCharacters.push(new OtherCharacter(this.character,
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

    public getCharacterRenderObjects() : IRenderObject[] {
        return this.otherCharacters.map(e => e.getRenderereObject());
    }
}