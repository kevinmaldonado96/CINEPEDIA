import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreList } from './genreList';
import { Observable } from 'rxjs';
import { Genre } from './genre';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}
  getGenres(): Observable<GenreList[]> {
    return this.http.get<GenreList[]>(`${environment.baseUrl}genres`);
  }
  postGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${environment.baseUrl}genres`, genre);
  }
}
