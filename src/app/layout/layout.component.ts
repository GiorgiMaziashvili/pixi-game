import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Application } from 'pixi.js';
import { Animate } from 'src/canvas/games/fast-slot/animation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  private app = new Application();
  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;
  
  async ngAfterViewInit() {
    await this.app.init({
      width:422,
      height:710,
      background:'black',
    });
    new Animate();
    this.canvas?.nativeElement.appendChild(this.app.canvas);
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }
}
