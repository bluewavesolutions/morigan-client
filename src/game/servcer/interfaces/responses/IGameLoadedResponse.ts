import { IMap } from "../serverModels/IMap";
import { ICharacter } from "../serverModels/ICharacter";

export interface IGameLoadedResponse {
    Character: ICharacter;
    OhterCharacters: any;
    Map: IMap;
}