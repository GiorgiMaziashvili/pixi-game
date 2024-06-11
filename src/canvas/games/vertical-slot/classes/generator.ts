import { Easing, Tween } from "@tweenjs/tween.js";
import { BlurFilter, Container, Graphics, Ticker } from "pixi.js";
import { Reels } from "./reels";
import { getSprite } from "src/canvas/utils";

export class GeneratorClass{
    private ticker = Ticker.shared;
    private reel = new Reels();
    private _container = new Container();

    constructor(options:any){
        
    }

    get container(){
        return this._container;
    }

    init(){
        this.reel.createReels();
        this._container.addChild(this.reel.container);

        this.ticker.add(this.reel.updateReels.bind(this.reel));
        this.reel.startPlay();
    }
}