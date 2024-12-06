import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Movie} from "./movie";

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private apiUrl: string = environment.baseUrl + 'movies';
  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovieById(id: string): Observable<Movie> {
    let url: string = this.apiUrl + '/' + id;
    return this.http.get<Movie>(url);
  }
}
