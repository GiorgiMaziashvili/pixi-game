import { PrizeType } from "../types";

class ConfigService {
    private _prizes:PrizeType[] = [];
    private _reels:number[] = [];
    private _nextReels:number[] = [];

    get prizes() {
        return this._prizes;
    }

    init(options:any){
        this._reels = options.reels;
    }

    setPrizes(prizes:PrizeType[]) {
        this._prizes = prizes;
    }

    getPrize(){
        console.log('get prize')
    }
}

export const configService = new ConfigService();