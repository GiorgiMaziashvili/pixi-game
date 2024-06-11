import { BlurFilter, Container } from "pixi.js";
import { backout, getSprite, lerp } from "src/canvas/utils";
import { Tween } from "@tweenjs/tween.js";

export class Reels{
    public reels:any = [];
    public container = new Container();
    private tweening:any = [];
    
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
                // symbol.x = Math.round((100 - symbol.width) / 2);
                symbol.y = 0;
                reel.symbols.push(symbol);
                rc.addChild(symbol);
            }
            this.reels.push(reel);
        }
    }

    updateReels(){
        for (let i = 0; i < this.reels?.length; i++){
            const r = this.reels[i];
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            for (let j = 0; j < r.symbols.length; j++)
            {
                const s = r.symbols[j];
                const prevy = s.y;

                s.x = ((r.position + j) % r.symbols.length) * 100 - 100;
                if (s.x < 0 && prevy >= 100){
                    s.texture = getSprite('slot-symbols','5').texture;
                    // s.scale.y = s.scale.y = Math.min(100 / s.texture.width, 100 / s.texture.height);
                    s.y = Math.round((100 - s.texture.width) / 2);
                }
            }
        }
    }

    startPlay(){   
        for (let i = 0; i < this.reels?.length; i++){
            const r = this.reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            this.tweenTo(
                r,
                'position',
                target,
                time, 
                backout(0.5),
                null,
                i === this.reels.length - 1 ? this.reelsComplete : null);
        }
    }

    tweenTo(object:any, property:any, target:any, time:any, easing:any, onchange:any, oncomplete:any){
        new Tween(object)
        .to({ [property]: target }, time)
        .easing(easing)
        .onUpdate(() => {
            if (property === 'position') {
                object[property] = object.position;
            }
        })
        .onComplete(this.reelsComplete)
        .start();
    }

    reelsComplete(){
        console.log('done')
    }

}