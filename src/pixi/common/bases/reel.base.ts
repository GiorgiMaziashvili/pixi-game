import { Tween, Easing } from "@tweenjs/tween.js";
import { Container, Ticker, BlurFilter } from "pixi.js";
import { backout, getSprite } from "../utils";
import { _ConfigService } from "../services/config.service";

export class ReelBase {
    private readonly configService = _ConfigService;
    public reels:any = [];
    public container = new Container();
    private ticker = Ticker.shared
    private reelsIndex = [
        [1,2,3,4],
        [1,2,3,4],
        [1,2,3,4],
        [1,2,3,4],
    ]
    
    createReels(){
        const { reels: reelsTotal, tiles: tilesTotal } = this.configService.config.options || {};
        (window as any).ticker = this.ticker;
        console.log(reelsTotal, tilesTotal)
        for (let i = 0; i < reelsTotal; i++){
            const rc = new Container();
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
            
            for (let j = 0; j < tilesTotal; j++){
                const symbol = getSprite('slot-symbols',(this.reelsIndex[i][j]).toString());
                symbol.y = j * 100;
                symbol.scale.y = symbol.scale.x = Math.min(100 / symbol.width, 100 / symbol.height);
                symbol.x = i*100;
                reel.symbols.push(symbol);
                rc.addChild(symbol);
            }
            this.reels.push(reel);
        }

        this.container.eventMode = "dynamic"
        this.container.addEventListener("click",this.startPlay.bind(this));
        this.ticker.add(this.updateReels.bind(this));
        (window as any).play =  this.startPlay.bind(this);
    }

    updateReels(){
        for (let i = 0; i < this.reels?.length; i++){
            const r = this.reels[i];
            r.blur.blurY = (r.position - r.previousPosition) * 14;
            r.previousPosition = r.position;
            for (let j = 0; j < r.symbols.length; j++){
                const s = r.symbols[j];
                s.texture = getSprite('slot-symbols',(this.reelsIndex[i][j]).toString()).texture; 
                s.y = ((r.position + j) % r.symbols.length) * 100 - 100;
                
            }
        }
    }

    startPlay(){   
        for (let i = 0; i < this.reels?.length; i++){
            const r = this.reels[i];
            const target = r.position + 24;
            this.tweenTo(
                r,
                'position',
                target,
                3500,
                backout(0.5),
                i,
                i === this.reels.length - 1 ? this.reelsComplete : null).start();
        }
    }

    tweenTo(object:any, property:any, target:any, time:any, easing:any, index:number, oncomplete:any){
        const tween = new Tween(object)
        .to({ [property]: target }, time)
        .easing(Easing.Quadratic.InOut)
        .onUpdate((prop,elapsed) => {
            if (property === 'position') {
                object[property] = object.position;
            }
        })
        .delay(50*index*3)
        .onComplete(()=>{
            this.reelsComplete();
        })
        .start()
        return tween;
    }

    reelsComplete(){
        // this.reelsIndex = [
        //     [1,3,2,3],
        //     [1,3,2,3],
        //     [1,3,2,3],
        // ]
        // this.startPlay();
    }
}