import { IServerEventInterpreter } from "../interfaces/ISeverEventInterpreter";
import { IEngineErrorResponse } from "../../communication/interfaces/responses/IEngineErrorResponse";

export class EngineErrorEventInterpreter implements IServerEventInterpreter<IEngineErrorResponse> {
    async execute(data: IEngineErrorResponse): Promise<void> {
        throw new Error(data.Message);
    } 
}