import { Tween } from "@tweenjs/tween.js";
import { ReelBase } from "../bases/reel.base";
import { DoubleClick } from "./double-click";

export class Reel extends ReelBase{
    private handlePlay = new DoubleClick().handlePlay

    init(){
        this.createReels();
        this.container.eventMode = "dynamic"
        this.container.addEventListener("click",this.spin.bind(this));
    }

    pause(){
        this.tweens.forEach((tween:Tween<any>) => {
            tween.pause();
            this.ticker.stop();
        })
    }

    resume(){
        this.tweens.forEach((tween:Tween<any>) => {
            tween.resume();
            this.ticker.start();
        })
    }

    spin(){
        this.handleSpin(false);
        // this.handlePlay(this.handleSpin)
    }

    handleSpin = (isDoubleClick?:boolean) => {
        this.quickSpin = isDoubleClick;
        this.play();
    }
}