import { Assets } from "pixi.js";
import { BundleType } from "../types/bundle.type";

export class BundleClass{
    private aliases:string[] = [];

    public add(bundle:BundleType){
        const { alias, manifest } = bundle;
        Assets.addBundle(alias,manifest);
        this.aliases.push(alias);
        return this;
    }

    public load(){
        return Assets.loadBundle(this.aliases)
    }

    public destroy(){
        this.aliases = [];
        Assets.reset();
    }
}