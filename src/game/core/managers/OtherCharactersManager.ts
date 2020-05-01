import { EngineMediator } from "../EngineMediator";
import { OtherCharacter } from "../OtherCharacter";
import { IOtherCharacterMovedResponse } from "../../servcer/interfaces/responses/IOtherCharacterMovedResponse";
import { IRenderObject } from "../interfaces/IRenderObject";
import { IOtherCharacter } from "../../servcer/interfaces/serverModels/IOtherCharacter";
import { Character } from "../Character";

export class OtherCharactersManager {
    private engineMediator: EngineMediator;
    private character: Character;

    private otherCharacters: OtherCharacter[] = [];

    constructor(engineMediator: EngineMediator, character: Character) {
        this.engineMediator = engineMediator;
        this.character = character;

        this.engineMediator.registerHandler('OtherCharactersManager::Load', (data: IOtherCharacter) => {
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