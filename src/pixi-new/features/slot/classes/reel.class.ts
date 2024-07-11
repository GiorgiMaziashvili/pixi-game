import { Container } from "pixi.js"
import { ReelCore } from "./reel-core.class";

export class Reel{
    private _container = new Container();
    private reelBase = new ReelCore();

    get container(){
        return this._container
    }

    init(){
        this.reelBase.createReels();
        this._container.addChild(this.reelBase.container)
    }
}