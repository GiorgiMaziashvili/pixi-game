import { ReelClass } from "./reel.class";
import { Container } from "pixi.js";

export class GeneratorClass{
    private _container = new Container();
    private reels = new ReelClass();

    get container(){
        return this._container
    }

    init(){
        this.reels.create();
        this._container.addChild(this.reels.container);
    }
}