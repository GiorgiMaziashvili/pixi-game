import { Injectable } from "@angular/core";

class ConfigService {
    config:any;

    async fetchConfig(){
        await fetch('/assets/slot/config.json')
            .then((res) => this.formatData(res))
            .catch(e => console.error(e));
        
        console.log(this.config);
    }

    private async formatData(res:Response){
        await res.json().then((res)=> this.config = res);
    }
}

export const _ConfigService = new ConfigService();