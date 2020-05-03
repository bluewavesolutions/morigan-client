import { EngineMediator } from "../../utils/EngineMediator";
import { OtherCharacter } from "../OtherCharacter";
import { IOtherCharacterMovedResponse } from "../../server/interfaces/responses/IOtherCharacterMovedResponse";
import { IRenderObject } from "../interfaces/IRenderObject";
import { IOtherCharacterServerModel } from "../../server/interfaces/serverModels/IOtherCharacterServerModel";
import { singleton } from "tsyringe";
import { Camera } from "../Camera";
import { AnimationManager } from "./AnimationManager";

@singleton()
export class OtherCharactersManager {
    private otherCharacters: OtherCharacter[] = [];

    constructor(
        private engineMediator: EngineMediator,
        private animationManager: AnimationManager,
        private camera: Camera
    ) {
        this.engineMediator.registerHandler('OtherCharactersManager::Load', (data: IOtherCharacterServerModel) => {
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

        this.engineMediator.registerHandler('OtherCharactersManager::Moved', (data: IOtherCharacterMovedResponse) => {
            let character = this.otherCharacters.find((e) => e.id == data.Id) as OtherCharacter;
            character.positionX = data.PositionX;
            character.positionY = data.PositionY;     
        });

        this.engineMediator.registerHandler('Character::ChangedDirection', async (direction: string) => {
            await this.move(direction);
        });
    }

    public async move(direction: string) {
        this.otherCharacters.map(async funct => await funct.move(direction));
    }

    public getCharacterRenderObjects() : IRenderObject[] {
        return this.otherCharacters.map(e => e.getRenderereObject());
    }
}