import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { IEngineErrorResponse } from "../../servcer/interfaces/responses/IEngineErrorResponse";

export class EngineErrorEventInterpreter implements IServerEventInterpreter<IEngineErrorResponse> {
    execute(data: IEngineErrorResponse): void {
        throw new Error(data.Message);
    } 
}