import { Assets } from "pixi.js";

export class BundleClass {
    private bundles:string[] = [];

    constructor(bundles:string[]){
        console.log('BundleClass');
    }

    load(){
        return Assets.loadBundle(this.bundles);
    }

    add(bundle:string){
        this.bundles.push(bundle);
    }
}