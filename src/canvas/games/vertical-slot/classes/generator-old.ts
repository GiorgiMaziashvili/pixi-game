import { Easing, Tween } from "@tweenjs/tween.js";
import { BlurFilter, Container, Graphics, Ticker } from "pixi.js";
import { Reels } from "./reels";
import { getSprite } from "src/canvas/utils";

export class GeneratorClass{
    private ticker = Ticker.shared;
    private _container = new Container();
    private readonly REEL_WIDTH = 100;
    private readonly SYMBOL_SIZE = 100;
    private reels:any = [];
    private tweening:any = [];
    private options = {};

    constructor(options:any){
        this.options = options;
    }

    get container(){
        return this._container;
    }

    init(){
        for (let i = 0; i < 5; i++)
            {
                const rc = new Container();
        
                rc.x = i * this.REEL_WIDTH;
                this._container.addChild(rc);
        
                const reel:any = {
                    container: rc,
                    symbols: [],
                    position: 0,
                    previousPosition: 0,
                    blur: new BlurFilter(),
                };
        
                reel.blur.blurX = 0;
                reel.blur.blurY = 0;
                rc.filters = [reel.blur];
        
                // Build the symbols
                for (let j = 0; j < 4; j++)
                {
                    const symbol = getSprite('slot-symbols','1');
                    // Scale the symbol to fit symbol area.
        
                    symbol.y = j * this.SYMBOL_SIZE;
                    symbol.scale.x = symbol.scale.y = Math.min(this.SYMBOL_SIZE / symbol.width, this.SYMBOL_SIZE / symbol.height);
                    symbol.x = Math.round((this.SYMBOL_SIZE - symbol.width) / 2);
                    reel.symbols.push(symbol);
                    rc.addChild(symbol);
                }
                this.reels.push(reel);
            }
        this.ticker.add(this.looper.bind(this));

        (window as any).spin = this.startPlay.bind(this);
    }
    
    looper(){
        for (let i = 0; i < this.reels?.length; i++)
            {
                const r = this.reels[i];
                // Update blur filter y amount based on speed.
                // This would be better if calculated with time in mind also. Now blur depends on frame rate.
                
                r.blur.blurY = (r.position - r.previousPosition) * 8;
                r.previousPosition = r.position;
    
                // Update symbol positions on reel.
                for (let j = 0; j < r.symbols.length; j++)
                {
                    const s = r.symbols[j];
                    const prevy = s.y;
    
                    s.y = ((r.position + j) % r.symbols.length) * this.SYMBOL_SIZE - this.SYMBOL_SIZE;
                    if (s.y < 0 && prevy > this.SYMBOL_SIZE)
                    {
                        // Detect going over and swap a texture.
                        // This should in proper product be determined from some logical reel.
                        s.texture = getSprite('slot-symbols','1').texture;
                        console.log(s.texture.width)
                        s.scale.x = s.scale.y = Math.min(this.SYMBOL_SIZE / s.texture.width, this.SYMBOL_SIZE / s.texture.height);
                        s.x = Math.round((this.SYMBOL_SIZE - s.texture.width) / 2);
                    }
                }
            }


        const now = Date.now();
        const remove = [];

        for (let i = 0; i < this.tweening.length; i++)
        {
            const t = this.tweening[i];
            const phase = Math.min(1, (now - t.start) / t.time);

            t.object[t.property] = this.lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if (t.change) t.change(t);
            if (phase === 1)
            {
                t.object[t.property] = t.target;
                if (t.complete) t.complete(t);
                remove.push(t);
            }
        }
        for (let i = 0; i < remove.length; i++)
        {
            this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
        }
    }
    startPlay(){   
        for (let i = 0; i < this.reels.length; i++){
            const r = this.reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            this.tweenTo(r, 'position', target, time, this.backout(0.5), null, i === this.reels.length - 1 ? this.reelsComplete : null);
        }
    }

    lerp(a1:number, a2:number, t:number)
    {
        return a1 * (1 - t) + a2 * t;
    }
    tweenTo(object:any, property:any, target:any, time:any, easing:any, onchange:any, oncomplete:any)
    {
        new Tween(object)
        .to({ [property]: target }, time)
        .easing(easing)
        .onUpdate(() => {
            if (property === 'position') {
                object[property] = object.position;
            }
        })
        .onComplete(this.reelsComplete)
        .start();
    }

    reelsComplete(){
        console.log('done')
    }
    // Backout function from tweenjs.
    // https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
    backout(amount:number)
    {
        return (t:number) => --t * t * ((amount + 1) * t + amount) + 1;
    }
    destroy(){
        this.ticker.remove(this.looper);
    }
}



// import { Easing, Tween } from "@tweenjs/tween.js";
// import { Container, Graphics } from "pixi.js";
// import { getSprite } from "src/canvas/utils";

// export class GeneratorClass {
//     private reelsInfo:any = [];
//     private _container = new Container();
//     reelsContainer = new Container();
//     private tileUnit = 100;
    

//     private readonly REELS = 3;
//     private readonly TILES = 5;

//     get container(){
//         this.init();
//         return this._container;
//     }

//     init(){
//         this.generator();
//         this.play();
//     }

//     generator(){
//         this._container.addChild(
//             new Graphics()
//             .rect(window.innerWidth/2 - 422/2 ,0,422,300)
//             .fill({color:'gray'})
//         );
//         this.reels();
//     }

//     reels(){
//         const screenContainer = new Container();
//         Array.from({length:this.REELS}).map((_,index:number)=>{
//             const container = new Container();
//             container.position.set(0,this.tileUnit * index);
            
//             this.reelsInfo[index] = {
//                 reel:container,
//                 symbols:[],
//             };
            
//             this.tiles(index);
//             screenContainer.addChild(container);
//         })
//         screenContainer.position.set(window.innerWidth/2 - screenContainer.width/2 ,0);
//         this._container.addChild(screenContainer);
//     }

//     tiles(parentIndex:number){
//         Array.from({length:this.TILES}).map((_,index:number)=> {
//             const reel = this.reelsInfo[parentIndex];
//             const symbol = this.getSymbol('1');
//             symbol.position.set(this.tileUnit * index,0);
//             reel.reel.addChild(symbol);
//             reel.symbols.push(symbol);
//         })
//     }

//     getSymbol(alias:string){
//         return getSprite('slot-symbols',alias);
//     }

//     play(){
//         for (let i = 0; i < this.reelsInfo.length; i++) {
//             const element = this.reelsInfo[i];
//             const direction = (i === 1) ? -1 : 1;  // Reverse direction for the second reel
//             for (let j = 0; j < element.symbols.length; j++) {
//                 const symbol = element.symbols[j];
//                 const startPosition = symbol.position.x;
//                 const endPosition = startPosition + 10 * direction;

//                 const tween:any = new Tween({ x: startPosition })
//                     .to({ x: endPosition }, 2000)  // Duration in milliseconds
//                     .easing(Easing.Linear.None)
//                     .onUpdate((prop) => {
//                         symbol.position.x = this.lerp(startPosition, endPosition, prop.x);
//                     })
//                     .onComplete(() => {
//                         if (i === this.REELS - 1 && j === element.symbols.length - 1) {
//                             console.log('Animation complete');
//                         }
//                     });

//                 tween.start();
//             }
//         }
//     }
//     lerp(start:any, end:any, t:any) {
//         return start * (1 - t) + end * t;
//     }
// }























//REEL CLASS



// import { BlurFilter, Container } from "pixi.js";
// import { backout, getSprite, lerp } from "src/canvas/utils";
// import { Tween } from "@tweenjs/tween.js";

// export class Reels{
//     public reels:any = [];
//     public container = new Container();
//     private tweening:any = [];
    
//     createReels(){
//         for (let i = 0; i < 5; i++){
//             const rc = new Container();
//             rc.x = i * 100;
//             this.container.addChild(rc);
    
//             const reel:any = {
//                 container: rc,
//                 symbols: [],
//                 position: 0,
//                 previousPosition: 0,
//                 blur: new BlurFilter(),
//             };
    
//             reel.blur.blurX = 0;
//             reel.blur.blurY = 0;
//             rc.filters = [reel.blur];
    
//             for (let j = 0; j < 4; j++){
//                 const symbol = getSprite('slot-symbols','1');
//                 symbol.y = j * 100;
//                 symbol.scale.x = symbol.scale.y = Math.min(100 / symbol.width, 100 / symbol.height);
//                 symbol.x = Math.round((100 - symbol.width) / 2);
//                 reel.symbols.push(symbol);
//                 rc.addChild(symbol);
//             }
//             this.reels.push(reel);
//         }
//     }

//     updateReels(){
//         const now = Date.now();
//         const remove = [];
//         for (let i = 0; i < this.reels?.length; i++){
//             const r = this.reels[i];
//             r.blur.blurY = (r.position - r.previousPosition) * 8;
//             r.previousPosition = r.position;

//             for (let j = 0; j < r.symbols.length; j++)
//             {
//                 const s = r.symbols[j];
//                 const prevy = s.y;

//                 s.y = ((r.position + j) % r.symbols.length) * 100 - 100;
//                 if (s.y < 0 && prevy > 100)
//                 {
//                     s.texture = getSprite('slot-symbols','1').texture;
//                     s.scale.x = s.scale.y = Math.min(100 / s.texture.width, 100 / s.texture.height);
//                     s.x = Math.round((100 - s.texture.width) / 2);
//                 }
//             }
//         }
//         for (let i = 0; i < this.tweening?.length; i++){
//             const t = this.tweening[i];
//             const phase = Math.min(1, (now - t.start) / t.time);

//             t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
//             if (t.change) t.change(t);
//             if (phase === 1)
//             {
//                 t.object[t.property] = t.target;
//                 if (t.complete) t.complete(t);
//                 remove.push(t);
//             }
//         }
//         for (let i = 0; i < remove.length; i++){
//             this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
//         }
//     }

//     startPlay(){   
//         for (let i = 0; i < this.reels?.length; i++){
//             const r = this.reels[i];
//             const extra = Math.floor(Math.random() * 3);
//             const target = r.position + 10 + i * 5 + extra;
//             const time = 2500 + i * 600 + extra * 600;
//             this.tweenTo(
//                 r,
//                 'position',
//                 target,
//                 time, backout(0.5),
//                 null,
//                 i === this.reels.length - 1 ? this.reelsComplete : null
//             );
//         }
//     }

//     tweenTo(object:any, property:any, target:any, time:any, easing:any, onchange:any, oncomplete:any){
//         new Tween(object)
//         .to({ [property]: target }, time)
//         .easing(easing)
//         .onUpdate(() => {
//             if (property === 'position') {
//                 object[property] = object.position;
//             }
//         })
//         .onComplete(this.reelsComplete)
//         .start();
//     }

//     reelsComplete(){
//         console.log('done')
//     }

// }