import { fetchData } from "src/pixi-new/common/utils";

class OptionsService {
    private _options:any = {};

    get options(){
        return this._options;
    }

    get(url:string){
        return fetchData(url)
            .then((data) => this._options = data);
    }
    
}

export const optionsService = new OptionsService();