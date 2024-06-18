import { Assets } from "pixi.js";
import { IBundle } from "../constants/bundles.constant";

export class BundleClass{
    load(bundleIds:IBundle[]){
        this.addBundle(bundleIds);
        return Assets.loadBundle('slot');
    }

    addBundle(bundles:IBundle[]){
        bundles.forEach((bundle:IBundle) => {
            Assets.addBundle(bundle.alias,bundle.manifest);
        });
    }
}