import { Component, Input, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  @Input() images: { title: string; imgLink: string }[] = [];

  customCarouselTokens = signal({
    indicator: {
      height: '1rem',
      width: '1rem',
      borderRadius: '9999px',
    },
    responsiveOptions: [
      {
        breakpoint: '645px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
    ],
    autoplayInterval: 3000,
    circular: true,
  });

  ngOnInit(): void {
    this.circularHandler();
  }

  circularHandler() {
    let screenSize = innerWidth;

    for (
      let i = 0;
      i < this.customCarouselTokens().responsiveOptions.length;
      i++
    ) {
      const currentElement = this.customCarouselTokens().responsiveOptions[i];
      const breakpoint = parseInt(currentElement.breakpoint, 10);

      if (screenSize <= breakpoint) {
        if (this.images.length <= currentElement.numVisible) {
          this.customCarouselTokens().circular = false;
          break;
        } else {
          this.customCarouselTokens().circular = true;
          break;
        }
      }
    }
  }
}
