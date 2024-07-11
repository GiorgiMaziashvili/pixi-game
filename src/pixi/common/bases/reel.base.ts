import { Tween, Easing } from "@tweenjs/tween.js";
import { Container, Ticker, BlurFilter } from "pixi.js";
import { backout, getSprite } from "../utils";
import { ConfigService } from "../services/config.service";
import { TilesBase } from "./tiles.base";

export class ReelBase extends TilesBase{
    private readonly configService = ConfigService;
    public reels:any = [];
    public container = new Container();
    private isPlaying = false;
    currentIndex = 0;
    quickSpin?:boolean;
    ticker = Ticker.shared;
    tweens:any[] = [];
    reelsIndex = [];
    nextReelsIndex = [];
    
    createReels(){
        const { reels: reelsTotal, tiles: tilesTotal } = this.configService.config.options || {};
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
                const symbol = this.createTile({
                    width: 100,
                    height: 100,
                    reelIndex: i,
                    tileIndex: j,
                    alias: this.reelsIndex[i][j]
                })
              
                reel.symbols.push(symbol);
                rc.addChild(symbol);
            }
            this.reels.push(reel);
        }

  
        this.ticker.add(this.updateReels.bind(this));
       
    }

    private updateReels() {
        for (let i = 0; i < this.reels?.length; i++){
            const r = this.reels[i];
            r.blur.blurY = (r.position - r.previousPosition) * 14;
            r.previousPosition = r.position;
            for (let j = 0; j < r.symbols.length; j++){
                const s = r.symbols[j];
                s.y = ((r.position + j) % r.symbols.length) * 100 - 100;
                if(s.y < 0) s.texture = getSprite('slot-symbols',(this.reelsIndex[i][j])).texture;
            }
        }
    }

    play(){
        if(this.isPlaying) return;
        this.isPlaying = true;
        this.tweens = [];
        for (let i = 0; i < this.reels?.length; i++){
            const r = this.reels[i];
            const target = r.position + (this.quickSpin ? 4 : 12);

            this.tweenTo(
                r,
                'position',
                target,
                this.quickSpin ? 800 : 2000,
                backout(0.5),
                i,
                i === this.reels.length - 1 ? this.reelsComplete.bind(this) : null
            );
        }
    }

    // handlePlay(){
    //     let timer:any;
    //     this.clicks++;
    //     if(this.clicks === 1) {
    //         timer = setTimeout(() =>  {
    //             this.play();
    //             this.clicks = 0;         
    //         }, 300);
    //     } else {
    //         clearTimeout(timer);  
    //         this.quickSpin = true; 
    //         this.clicks = 0;
    //     }
    // }

    private tweenTo(object:any, property:any, target:any, time:any, easing:any, index:number, oncomplete:any){
        const tween = new Tween(object)
        .to({ position: target }, time)
        .easing(Easing.Quadratic.InOut)
        .delay(50*index*3)
        .start()
        .onComplete(()=>{
            oncomplete &&  oncomplete();
        })
        this.tweens.push(tween);
    }

    reelsComplete(){
        this.isPlaying = false;
        if(this.currentIndex < this.nextReelsIndex.length - 1){
            this.currentIndex++;
        }else{
            this.currentIndex = 0
        }
        this.quickSpin = false;
    }
}