import { getSprite } from "../utils";

interface ITile {
    width: number;
    height: number;
    reelIndex: number; 
    tileIndex: number;
    alias:string | number;
}

export class TilesBase {
    createTile(tile:ITile){
        const {
            width,
            height,
            reelIndex,
            tileIndex,
            alias,
        } = tile || {};

        const symbol = getSprite('slot-symbols',(alias).toString());
        symbol.y = tileIndex * height;
        symbol.scale.y = symbol.scale.x = Math.min(100 / symbol.width, 100 / symbol.height);
        symbol.x = reelIndex*width;

        return symbol;
    }
}