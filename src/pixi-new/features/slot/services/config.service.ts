import { PrizeType } from "../types";

export class ConfigService {
    private _prizes:PrizeType[] = [];
    private _reels:number[] = [];
    private _nextReels:number[] = [];

    get prizes() {
        return this._prizes;
    }

    setPrizes(prizes:PrizeType[]) {
        this._prizes = prizes;
    }

}