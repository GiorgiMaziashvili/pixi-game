import { Easing, Tween } from "@tweenjs/tween.js";
import { Container, Graphics, Ticker } from "pixi.js";
import { Reels } from "./reels";

export class GeneratorClass extends Reels{
    private ticker = Ticker.shared;
    private _container = new Container();
    private options = {};

    constructor(options:any){
        super();
        this.options = options;
    }

    get container(){
        return this._container;
    }

    init(){
        this.ticker.add(this.looper);
    }
    
    looper(){
        
    }
    
    destroy(){
        this.ticker.remove(this.looper);
    }
}