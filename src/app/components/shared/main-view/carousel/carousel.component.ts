import { Component, Input, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-carousel',
  imports: [CarouselModule, SkeletonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  @Input() images = signal<{ title: string; imgLink: string }[]>([]);
  @Input() enableSkeleton: boolean = false;

  screenSize = signal(0);
  skeletonNumber = signal(0);

  customCarouselTokens = signal({
    indicator: {
      height: '0.5rem',
      width: '0.5rem',
      borderRadius: '9999px',
    },
    indicatorList: {
      padding: '0rem',
    },
    content: { gap: '0rem' },
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
      {
        breakpoint: '1800px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '2200px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '2600px',
        numVisible: 5,
        numScroll: 1,
      },
    ],
    autoplayInterval: 3000,
    circular: true,
  });

  ngOnInit(): void {
    this.screenFounder();
    this.circularHandler();
    this.skeletonHandler();
  }

  circularHandler() {
    this.customCarouselTokens().responsiveOptions.forEach((element) => {
      const breakpoint = parseInt(element.breakpoint, 10);
      if (this.screenSize() === breakpoint) {
        if (this.images().length <= element.numVisible) {
          this.customCarouselTokens().circular = false;
        } else {
          this.customCarouselTokens().circular = true;
        }
      }
    });
  }

  private skeletonHandler() {
    this.customCarouselTokens().responsiveOptions.forEach((element) => {
      const breakpoint = parseInt(element.breakpoint, 10);
      if (this.screenSize() === breakpoint) {
        this.skeletonNumber.set(element.numVisible);
      }
    });
  }

  private screenFounder() {
    const screenSize = innerWidth;

    for (const element of this.customCarouselTokens().responsiveOptions) {
      const breakpoint = parseInt(element.breakpoint, 10);

      if (screenSize <= breakpoint) {
        this.screenSize.set(breakpoint);
        break;
      }
    }
  }

  get skeletonArrayNumber() {
    return Array.from({ length: this.skeletonNumber() }, (_, i) => i);
  }
}
