import { singleton } from "tsyringe";

var jwt = localStorage.getItem('jwt');
if (jwt === null) {
    jwt = prompt("jwt") as string;
    localStorage.setItem('jwt', jwt);
}

@singleton()
export class EngineStore {
    jwt: string = jwt as string;
    characterId: number = 1;//Number(prompt('character') as string);
    session: string = '';
}