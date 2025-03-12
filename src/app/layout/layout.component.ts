import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
<<<<<<< HEAD
import { PixiClass } from 'src/canvas/common/classes/pixi';
import { MainEntry } from 'src/pixi/entries/main.entrie';
=======
import { MainEntry } from 'src/games/entries/main.entry';
>>>>>>> 46c54d192fe282cc1499a774a8911342a65847e0

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;
<<<<<<< HEAD
  private mainEntry = new MainEntry();
  
  async ngAfterViewInit() {
    this.mainEntry.init(this.canvas?.nativeElement);
=======
  private entry = new MainEntry();
  
  async ngAfterViewInit() {
    this.entry.once(this.canvas?.nativeElement);
>>>>>>> 46c54d192fe282cc1499a774a8911342a65847e0
  }

  ngOnDestroy(): void {
    this.entry.destroy();
  }
}
