import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MainEntry } from 'src/games/entries/main.entry';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;
  private entry = new MainEntry();
  
  async ngAfterViewInit() {
    this.entry.once(this.canvas?.nativeElement);
  }

  ngOnDestroy(): void {
    this.entry.destroy();
  }
}
