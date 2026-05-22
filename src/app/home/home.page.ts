import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonSpinner, IonButton,
  IonIcon, IonInfiniteScroll,
  IonInfiniteScrollContent, InfiniteScrollCustomEvent,
  IonSkeletonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

import { MovieService, Movie } from '../services/movie.service';
import { StarRatingPipe } from '../pipes/star-rating.pipe';
import { MovieScoreDirective } from '../directives/movie-score.directive';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    StarRatingPipe,
    MovieScoreDirective,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonSpinner, IonButton,
    IonIcon, IonInfiniteScroll,
    IonInfiniteScrollContent, IonSkeletonText,
  ],
})
export class HomePage implements OnInit {
  movies: Movie[] = [];
  currentPage = 1;
  isLoading = true;
  hasError = false;

  constructor(private movieService: MovieService, private router: Router) {
    addIcons({ star });
  }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.movieService.getWorstPopularMovies(this.currentPage).subscribe({
      next: (res) => {
        this.movies = [...this.movies, ...res.results];
        this.isLoading = false;
        this.currentPage++;
        event?.target.complete();
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
        event?.target.complete();
      },
    });
  }

  goToDetail(movie: Movie) {
    this.router.navigate(['/detail', movie.id]);
  }

  getPosterUrl(path: string | null): string {
    if (!path) return 'assets/no-poster.png';
    return this.movieService.IMAGE_BASE + path;
  }
}