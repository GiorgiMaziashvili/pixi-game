import { Assets } from "pixi.js";

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
    }
}