import { Assets, Sprite } from "pixi.js";
import { optionsService } from "src/games/shared/services/options.service";

export class TileClass{

    create(reelIndex:number, tileIndex:number){
        const { height, width } = optionsService.options.tiles || {};

        const symbol = new Sprite(Assets.get("symbol_1"));
        symbol.y = tileIndex * height;
        symbol.scale.y = symbol.scale.x = Math.min(100 / symbol.width, 100 / symbol.height);
        symbol.x = reelIndex*width;

        return symbol;
    }
}