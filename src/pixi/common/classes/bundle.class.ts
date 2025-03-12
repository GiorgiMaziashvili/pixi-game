import { Assets } from "pixi.js";
<<<<<<< HEAD

interface IBundles {
    name: string,
    assets: Record<string,string>
}

export class BundleClass{
    load(bundles:IBundles[]){
        this.preAdd(bundles);
        return Assets.loadBundle(['bundleName'])
    }

    preAdd(bundles:IBundles[]){
        bundles.forEach(bundle=>{
            Assets.addBundle(bundle.name,bundle.assets)
        })
=======
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
>>>>>>> 46c54d192fe282cc1499a774a8911342a65847e0
    }
}