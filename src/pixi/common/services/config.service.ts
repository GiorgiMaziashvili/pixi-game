class _ConfigService {
    config:any;

    async fetchConfig(){
        await fetch('/assets/slot/config.json')
            .then((res) => this.formatData(res))
            .catch(e => console.error(e));
    }

    private async formatData(res:Response){
        await res.json().then((res)=> this.config = res);
    }
}

export const ConfigService = new _ConfigService();