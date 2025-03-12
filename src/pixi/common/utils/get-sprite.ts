import { Assets, Sprite } from "pixi.js";

export const getSprite = (bundleId:string,alias:string) => {
    const base = Assets.get(bundleId).textures; 
    return new Sprite(base[alias]);
}