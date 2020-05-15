export interface IServerEventInterpreter<T> {
    execute(data: T): Promise<void>;
}