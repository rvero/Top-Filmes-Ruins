import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appMovieScore]',
  standalone: true,
})
export class MovieScoreDirective implements OnInit {
  @Input('appMovieScore') rank: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const badge = this.renderer.createElement('div');
    const text = this.renderer.createText(`#${this.rank}`);
    this.renderer.appendChild(badge, text);
    this.renderer.addClass(badge, 'rank-badge');
    if (this.rank <= 3) {
      this.renderer.addClass(badge, 'rank-top');
    }
    this.renderer.appendChild(this.el.nativeElement, badge);
  }
}