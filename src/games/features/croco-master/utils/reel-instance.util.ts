import { BlurFilter, Container } from "pixi.js";

export const reelInstance = ():any => ({
    container: new Container(),
    symbols: [],
    position: 0,
    previousPosition: 0,
    blur: new BlurFilter(),
})