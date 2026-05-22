import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
  standalone: true,
})
export class StarRatingPipe implements PipeTransform {
  transform(vote: number): string {
    const stars = Math.round(vote / 2);
    const filled = '★'.repeat(stars);
    const empty = '☆'.repeat(5 - stars);
    return filled + empty;
  }
}