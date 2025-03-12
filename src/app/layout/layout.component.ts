import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { PixiClass } from 'src/canvas/common/classes/pixi';
import { MainEntry } from 'src/pixi/entries/main.entrie';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;
  private mainEntry = new MainEntry();
  
  async ngAfterViewInit() {
    this.mainEntry.init(this.canvas?.nativeElement);
  }

  ngOnDestroy(): void {
    console.log('destroyed')
  }
}
