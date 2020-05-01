import { EngineMediator } from "../EngineMediator";
import { IOtherCharacterLoadedResponse } from "../../servcer/interfaces/responses/IOtherCharacterLoadedResponse";
import { OtherCharacter } from "../OtherCharacter";
import { IOtherCharacterMovedResponse } from "../../servcer/interfaces/responses/IOtherCharacterMovedResponse";
import { IRenderObject } from "../interfaces/IRenderObject";

export class OtherCharactersManager {
    private engineMediator: EngineMediator;
    private otherCharacters: OtherCharacter[] = [];

    constructor(engineMediator: EngineMediator) {
        this.engineMediator = engineMediator;

        this.engineMediator.registerHandler('OtherCharactersManager::Load', (data: IOtherCharacterLoadedResponse) => {
            let findIndex = this.otherCharacters.findIndex(e => e.id == data.Id);
            if(findIndex >= 0) {
                return;
            }

            this.otherCharacters.push(new OtherCharacter(data.Id, 
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