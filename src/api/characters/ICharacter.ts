export interface ICharacter {
    id: number,
    accountId: number,
    nick: number,
    mapId: number,
    outfitResourceFileId: string,
    positionX: number,
    positionY: number,
    world: {
        id: number,
        code: string,
        name: string, 
        state: string
    },
    state: string
}