import { IMap } from "../serverModels/IMap";
import { ICharacter } from "../serverModels/ICharacter";

export interface IGameLoadedResponse {
    Character: ICharacter;
    OtherCharacters: any;
    Map: IMap;
}