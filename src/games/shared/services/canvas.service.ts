import { Application } from "pixi.js";

class CanvasClass {
    private _app = new Application();

    get app(){
        return this._app;
    }

    public async init(){
        await this._app.init({
            width: 422,
            height: 710,
            backgroundColor: 'black',
        })
    }

    public destroy(){
        this._app.destroy(true,true);
        this._app = new Application();
    }
}

export const canvasService = new CanvasClass();