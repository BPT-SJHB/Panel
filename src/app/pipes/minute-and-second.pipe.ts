import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteAndSecond',
  standalone: true,
})
export class MinuteAndSecondPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    const totalSeconds = Math.max(0, Math.floor(value ?? 0));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const mm = minutes.toString().padStart(2, '0');
    const ss = seconds.toString().padStart(2, '0');

    return `${mm}:${ss}`;
  }
}
