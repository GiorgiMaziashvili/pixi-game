import { update } from "@tweenjs/tween.js";
import { Ticker } from "pixi.js";

export class Animate {
    private ticker = Ticker.shared;
    
    constructor() {
        this.ticker.autoStart = true;
        this.ticker.add(this.tweenUpdate.bind(this));
    }

    tweenUpdate(){
        update();
    }
}