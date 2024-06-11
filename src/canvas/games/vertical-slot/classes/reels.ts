import { BlurFilter, Container, Ticker } from "pixi.js";
import { backout, getSprite, lerp } from "src/canvas/utils";
import { Easing, Tween } from "@tweenjs/tween.js";

export class Reels{
    public reels:any = [];
    public container = new Container();
    private tweening:any = [];
    private ticker = Ticker.shared;
    
    createReels(){
        for (let i = 0; i < 3; i++){
            const rc = new Container();
            rc.y = i * 100;
            this.container.addChild(rc);
    
            const reel:any = {
                container: rc,
                symbols: [],
                position: 0,
                previousPosition: 0,
                blur: new BlurFilter(),
            };
    
            reel.blur.blurX = 0;
            reel.blur.blurY = 0;
            rc.filters = [reel.blur];
    
            for (let j = 0; j < 4; j++){
                const symbol = getSprite('slot-symbols',(i+1).toString());
                symbol.x = j * 100;
                symbol.scale.x = symbol.scale.y = Math.min(100 / symbol.width, 100 / symbol.height);
                symbol.y = 0;
                reel.symbols.push(symbol);
                rc.addChild(symbol);
            }
            this.reels.push(reel);
        }

        this.container.eventMode = "dynamic"
        this.container.addEventListener("click",this.startPlay.bind(this))
    }

    updateReels(){
        for (let i = 0; i < this.reels?.length; i++){
            const r = this.reels[i];
            const direction = i % 2 === 0 ? 1 : -1;
            r.blur.blurY = (r.position - r.previousPosition) * 14;
            r.previousPosition = r.position;

            for (let j = 0; j < r.symbols.length; j++)
            {
                const s = r.symbols[j];
                const prevy = s.x;
                
                s.x = ((r.position + j) % r.symbols.length) * 100 - 100;
            }
        }
    }

    startPlay(){   
        for (let i = 0; i < this.reels?.length; i++){
            const r = this.reels[i];
            const target = r.position + 10;
            this.tweenTo(
                r,
                'position',
                target,
                4000,
                backout(0.5),
                i,
                i === this.reels.length - 1 ? this.reelsComplete : null).start();
        }
    }

    tweenTo(object:any, property:any, target:any, time:any, easing:any, index:number, oncomplete:any){
       return new Tween(object)
        .to({ [property]: target }, time)
        .easing(Easing.Quadratic.InOut)
        .onUpdate((prop,elapsed) => {
            console.log(elapsed)
            if (property === 'position') {
                object[property] = object.position;
            }
        })
        // .delay(50*index)
        .onComplete(this.reelsComplete)
        
    }

    reelsComplete(){
        
    }

}