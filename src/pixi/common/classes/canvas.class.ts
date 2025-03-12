import { Application, Assets, Sprite, Container, Texture, PerspectiveMesh, Ticker } from "pixi.js";

export type Points = {
    x: number;
    y: number;
}

export class CanvasClass {
    private app = new Application();
    private container = new Container();
    private textures: Texture[] = [];
    private ticker = new Ticker();
    private rolling = false;
    points?:Points[];
    outPoints: any = [];
    angleX = [0, 0, 0];
    mesh:PerspectiveMesh[] = [];

    async init(element?: HTMLCanvasElement) {
        await this.app.init({
            width: window.innerWidth,
            height: window.innerHeight,
            background: '#000',
        });

        element?.appendChild(this.app.canvas);
        this.app.stage.addChild(this.container);

        

        this.textures = await Promise.all([
            Assets.load({ src: '/assets/Alea_1.png' }),
            Assets.load({ src: '/assets/Alea_2.png' }),
            Assets.load({ src: '/assets/Alea_3.png' }),
            // Assets.load({ src: '/assets/Alea_4.png' }),
            // Assets.load({ src: '/assets/Alea_5.png' }),
            // Assets.load({ src: '/assets/Alea_6.png' }),
        ])
        
        this.renderDice();
        this.ticker.add(this.updateMeshs);
        this.ticker.start();
        this.container.position.set(
            window.innerWidth / 2 - this.container.width /2 , 
            window.innerHeight / 2 - this.container.height /2
        );
    }

    renderDice(){
        (window as any).angleX = [0, 0, 0];
        this.textures.forEach((texture, index) => {
            if(index === 0){
                this.points = [
                    { x: 0, y: 0 },
                    { x: texture.width, y: 0 },
                    { x: texture.width, y: texture.height },
                    { x: 0, y: texture.height },
                ];
            }else if(index === 1){
                this.points = [
                    { x: 0, y: 0 },
                    { x: texture.width, y: 0 },
                    { x: texture.width, y: texture.height },
                    { x: 0, y: texture.height },
                ];
            }else{
                this.points = [
                    { x: 0, y: 0 },
                    { x: texture.width, y: 0 },
                    { x: texture.width, y: texture.height },
                    { x: 0, y: texture.height },
                ];
            }
            
            this.angleX = (window as any).angleX;
    
            this.outPoints[index] = this.points.map((p:any) => ({ ...p }));

            const mesh = new PerspectiveMesh({
                texture,
            })
            
            const height = mesh.height;
           
            mesh.position.set(0, 112 * index);
            this.mesh.push(mesh);
            this.container.addChild(mesh);
        })
    }


    rotate3D(texture:Texture,points?:Points[], outPoints?:Points[], angleX = 0, perspective = 0) {
        const radX = (angleX * Math.PI) / 180;
        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);

        for (let i = 0; i < (points?.length ?? 0); i++) {
            const src = points?.[i];
            const out = outPoints?.[i];

            if(!(src && out)) return; 
            
            const x = src.x - texture.width / 2;
            const y = src.y - texture.height / 2;
            let z = 0; // Assume initial z is 0 for this 2D plane

            // Rotate only around X axis
            const yX = cosX * y - sinX * z;

            z = sinX * y + cosX * z;

            // No rotation around Y axis, keep the x value fixed
            const xY = x;

            // Apply perspective projection
            const scale = perspective / (perspective - z);

            out.x = xY * scale + texture.width / 2;
            out.y = yX * scale + texture.height / 2;
        }
    }

    updateMeshs = () => {
        this.mesh.map((mesh, index) => {
            this.rotate3D(
                this.textures[index],
                this.points,
                this.outPoints[index],
                this.angleX[index],
                600
            );

            mesh.setCorners(
                this.outPoints[index][0].x,
                this.outPoints[index][0].y,
                this.outPoints[index][1].x,
                this.outPoints[index][1].y,
                this.outPoints[index][2].x,
                this.outPoints[index][2].y,
                this.outPoints[index][3].x,
                this.outPoints[index][3].y
            )
        });
    }
}
// export class CanvasClass {
//   private app = new Application();
//   private container = new Container();
//   private textures: Texture[] = [];
//   private ticker = new Ticker();
//   private rolling = false;
//   private angle = 0;
//   points :any;
//   outPoints :any;
//   angleX = 0;
//   mesh:any[] = [];

//     async init(element?: HTMLCanvasElement) {
//         await this.app.init({
//             width: 422,
//             height: 710,
//             background: '#000',
//         });
//         element?.appendChild(this.app.canvas);
//         this.app.stage.addChild(this.container);
//         // Load dice textures for each face (1-6)
//         this.textures = await Promise.all([
//             Assets.load({ src: '/assets/Alea_1.png' }),
//             Assets.load({ src: '/assets/Alea_2.png' }),
//             Assets.load({ src: '/assets/Alea_3.png' }),
//             // Assets.load({ src: '/assets/Alea_4.png' }),
//             // Assets.load({ src: '/assets/Alea_5.png' }),
//             // Assets.load({ src: '/assets/Alea_6.png' }),
//         ])
//         console.log(this.textures);
//         this.renderDice();
//         this.ticker.add(this.updateMeshs);
//         this.ticker.start();
//     }

//     renderDice(){
//         this.textures.forEach((texture, index) => {
//             this.points = [
//                 { x: 0, y: 0 },
//                 { x: texture.width, y: 0 },
//                 { x: texture.width, y: texture.height },
//                 { x: 0, y: texture.height },
//             ];
//             let angleX = 0;
//             (window as any).angleX = 0;
    
//             this.outPoints = this.points.map((p:any) => ({ ...p }));

//             const mesh = new PerspectiveMesh({
//                 texture,
//             })
//             // const shape = new Sprite(texture);
//             const height = mesh.height;
           
//             mesh.position.set(0, height * index);
//             this.mesh.push(mesh);
//             this.container.addChild(mesh);
//         })

//     }

//     rotate3D(texture:any,points:any, outPoints:any, angleX:any, perspective:any) {
//         const radX = (angleX * Math.PI) / 180;
//         const cosX = Math.cos(radX);
//         const sinX = Math.sin(radX);

//         for (let i = 0; i < points.length; i++) {
//             const src = points[i];
//             const out = outPoints[i];
//             const x = src.x - texture.width / 2;
//             const y = src.y - texture.height / 2;
//             let z = 0; // Assume initial z is 0 for this 2D plane

//             // Rotate only around X axis
//             const yX = cosX * y - sinX * z;

//             z = sinX * y + cosX * z;

//             // No rotation around Y axis, keep the x value fixed
//             const xY = x;

//             // Apply perspective projection
//             const scale = perspective / (perspective - z);

//             out.x = xY * scale + texture.width / 2;
//             out.y = yX * scale + texture.height / 2;
//         }
//     }

//     updateMeshs = () => {
//         this.rotate3D(
//             this.textures[2],
//             this.points,
//             this.outPoints,
//             (window as any).angleX,
//             300
//         );
//         this.mesh[2].setCorners(
//             this.outPoints[0].x,
//             this.outPoints[0].y,
//             this.outPoints[1].x,
//             this.outPoints[1].y,
//             this.outPoints[2].x,
//             this.outPoints[2].y,
//             this.outPoints[3].x,
//             this.outPoints[3].y
//         );
//     }
// }
