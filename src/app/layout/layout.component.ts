import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MainPromo } from '../../pixi-new/entries/main-promo/main-promo.entry';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;
  private canvasEntry = new MainPromo();
  
  async ngAfterViewInit() {
    this.canvasEntry.init(this.canvas?.nativeElement);
  }

  ngOnDestroy(): void {
    console.log('destroyed')
  }
}
