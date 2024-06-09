import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Application } from 'pixi.js';
import { Animate } from 'src/canvas/common/classes/animation';
import { PixiClass } from 'src/canvas/common/classes/pixi';
import { Entry } from 'src/canvas/entry';
import { VerticalSlot } from 'src/canvas/games/vertical-slot/initial';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  private pixiApp = new PixiClass();
  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;
  
  async ngAfterViewInit() {
    this.pixiApp.init(this.canvas?.nativeElement);
  }

  ngOnDestroy(): void {
    console.log('destroyed')
  }
}
