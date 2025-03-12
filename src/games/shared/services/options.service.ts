import { fetchData } from "pixi-new/common/utils";

class OptionsService{
    private _options:any = {};

    get options(){
        return this._options;
    }

    public once(url:string){
        return fetchData(url)
            .then((data) => this._options = data);
    }
}

export const optionsService = new OptionsService();