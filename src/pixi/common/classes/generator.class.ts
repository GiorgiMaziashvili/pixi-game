import { Container, Graphics } from "pixi.js";
import { Reel } from "./reel.class";
import { ConfigService } from "../services/config.service";

export class Generator{
    private readonly configService = ConfigService;
    private mask = new Graphics();
    container = new Container();
    reel = new Reel();
    
    async init(){
        await this.configService.fetchConfig();
        this.drawMask();
        const { generator } = this.configService.config || {};
        this.reel.init();
        this.container.addChild(this.reel.container);
        this.container.position.set(generator.x,generator.y);
    }

    drawMask(){
        const { mask } = this.configService.config || {};
        const { x, y, width, height } = mask || {};

        this.mask.rect(x, y, width, height).fill({color:'#fff'});
        this.container.mask = this.mask
        this.container.addChild(this.mask);
    }

    initialConfig(config:any){
        const { reels, prizes } = config || {};
        // this.reel.reelsIndex = reels;
        
    }
}