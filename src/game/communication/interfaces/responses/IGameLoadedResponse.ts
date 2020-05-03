import { IMapServerModel } from "../serverModels/IMapServerModel";
import { ICharacterServerModel } from "../serverModels/ICharacterServerModel";
import { IOtherCharacterServerModel } from "../serverModels/IOtherCharacterServerModel";

export interface IGameLoadedResponse {
    Character: ICharacterServerModel;
    OtherCharacters: IOtherCharacterServerModel[];
    Map: IMapServerModel;
}