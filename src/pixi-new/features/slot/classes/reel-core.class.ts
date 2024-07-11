import { Assets, BlurFilter, Container, Sprite, Ticker } from "pixi.js";
import { getSprite } from "src/pixi/common/utils";
import { optionsService } from "../services";

export class ReelCore{
    private reels:number[] = [1,5,3,4,1,5,3,4,1,5,3,4];
    private _container = new Container();
    private isPlaying = false;

    currentIndex = 0;
    quickSpin?:boolean;
    ticker = Ticker.shared;
    tweens:any[] = [];
    reelsIndex = [];
    nextReelsIndex = [];

    get container(){
        return this._container;
    }

    createReels(){
        const { reels: reelsTotal, tiles: tilesTotal } = optionsService.options.options || {};
        for (let i = 0; i < reelsTotal; i++){
            const rc = new Container();
            this._container.addChild(rc);
            
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
                    alias: 5
                })
              
                reel.symbols.push(symbol);
                rc.addChild(symbol);
            }
            this.reels.push(reel);
        }

  
        // this.ticker.add(this.updateReels.bind(this));
       
    }

    createTile(tile:any){
        const {
            width,
            height,
            reelIndex,
            tileIndex,
            alias,
        } = tile || {};

        console.log(tile);
        const symbol = new Sprite(Assets.get(alias));
        symbol.y = tileIndex * height;
        symbol.scale.y = symbol.scale.x = Math.min(100 / symbol.width, 100 / symbol.height);
        symbol.x = reelIndex*width;

        return symbol;
    }
}