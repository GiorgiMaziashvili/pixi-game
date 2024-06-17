import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Application } from 'pixi.js';
import { Animate } from 'src/canvas/common/classes/animation';
import { PixiClass } from 'src/canvas/common/classes/pixi';
import { Entry } from 'src/canvas/entry';
import { VerticalSlot } from 'src/canvas/games/vertical-slot/initial';
import { BundleClass } from 'src/pixi/common/bundle/bundle.class';
import { EntryClass } from 'src/pixi/entry/entry';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;
  private bundle = new BundleClass();
  private entry = new EntryClass(this.canvas?.nativeElement);
  
  async ngAfterViewInit() {
    // this.pixiApp.init(this.canvas?.nativeElement);
  }

  ngOnDestroy(): void {
    console.log('destroyed')
  }
}
