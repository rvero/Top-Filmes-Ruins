import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date: string;
  genre_ids: number[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly API_KEY = '229a55083c4bef4f7bcd11ca7ba65d20';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  readonly IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
  readonly BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';

  constructor(private http: HttpClient) {}

  getWorstPopularMovies(page: number = 1): Observable<MovieResponse> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'pt-BR')
      .set('sort_by', 'popularity.desc')
      .set('vote_count.gte', '1000')
      .set('vote_average.lte', '5.5')
      .set('vote_average.gte', '3.0')
      .set('page', page.toString());

    return this.http.get<MovieResponse>(`${this.BASE_URL}/discover/movie`, { params });
  }

  // ← renomeado de getMovieById para getMovieDetails
  getMovieDetails(id: number): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'pt-BR')
      .set('append_to_response', 'credits');

    return this.http.get<any>(`${this.BASE_URL}/movie/${id}`, { params });
  }
}