export class EngineStore {
    jwt: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJiZTAwNjkwYy0zNjI5LTRhNTktYjVhMy0yNTBhMmU2YjcxMzgiLCJlbWFpbCI6InNvbnF1ZXJAbzIucGwiLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsIm5iZiI6MTU4ODI4MDI2NCwiZXhwIjoxNTg4MzY2NjY0LCJpYXQiOjE1ODgyODAyNjQsImlzcyI6Im1vcmlnYW5faWRlbnRpdHkiLCJhdWQiOiJtb3JpZ2FuX2lkZW50aXR5In0.IbCZ5_kzIo9MuON75bouJewO5JcvflOiw1QvEthtGmM";
    characterId: number = Number(prompt('character') as string);
    session: string = '';
}