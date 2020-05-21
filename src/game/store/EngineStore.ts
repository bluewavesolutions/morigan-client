export class EngineStore {
    jwt: string;
    characterId: number;
    session: string = '';

    constructor() {
        const jwt = localStorage.getItem('jwt');
        if (jwt === null) {
            throw new Error('jwt is empty');
        }

        const character = localStorage.getItem('character');
        if (character === null) {
            throw new Error('character is empty');
        }

        this.jwt = jwt;
        this.characterId = Number(character);
    }
}