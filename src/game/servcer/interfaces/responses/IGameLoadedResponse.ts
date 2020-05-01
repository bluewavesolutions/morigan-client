import { IMap } from "../serverModels/IMap";
import { ICharacter } from "../serverModels/ICharacter";
import { IOtherCharacter } from "../serverModels/IOtherCharacter";

export interface IGameLoadedResponse {
    Character: ICharacter;
    OtherCharacters: IOtherCharacter[];
    Map: IMap;
}