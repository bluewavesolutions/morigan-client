let jwt = localStorage.getItem('jwt');
if (jwt === null) {
    jwt = prompt("jwt") as string;
    localStorage.setItem('jwt', jwt);
}

export class EngineStore {
    jwt: string = jwt as string;
    characterId: number = Number(prompt('character') as string);
    session: string = '';
}