import { Assets } from "pixi.js";
import { bundle } from "src/canvas/constants/bundle";

export class AssetsBase {
    constructor(){
        Assets.addBundle('slot',bundle.slot);
    }

    loadBundle(){
        return Assets.loadBundle('slot');
    }
}