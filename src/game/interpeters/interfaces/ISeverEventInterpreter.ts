export interface IServerEventInterpreter<T> {
    execute(data: T) : void;
}