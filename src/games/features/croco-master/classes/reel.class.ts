import { BlurFilter, Container } from "pixi.js";
import { optionsService } from "src/games/shared/services/options.service";
import { reelInstance } from "../utils/reel-instance.util";
import { TileClass } from "./tile.class";

export class ReelClass{
    private _container = new Container();
    private tile = new TileClass();
    private _reels:any[] = [];

    get container(){
        return this._container;
    }

    public create(){
        const { reels } = optionsService.options.config || {};
        for (let i = 0; i < reels; i++) this.loop(i);
    }

    private loop(reelIndex:number){
        const { tiles } = optionsService.options.config || {};
        
        const reel = reelInstance();
        reel.blur.blur = 0;
        reel.container.filters = [reel.blur];

        for (let i = 0; i < tiles; i++) {
            const symbol = this.tile.create(reelIndex,i)
            reel.container.addChild(symbol)
            reel.symbols.push(symbol)
        }

        this._container.addChild(reel.container);
        this._reels.push(reel);
    }
}