import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DirectorDetails } from './director-details';
import { DirectorCreate } from './directorCreate';

@Injectable({
  providedIn: 'root',
})
export class DirectorService {
  constructor(private http: HttpClient) {}
  getDirectors(): Observable<DirectorDetails[]> {
    return this.http.get<DirectorDetails[]>(`${environment.baseUrl}directors`);
  }

  getDirectorDetail(directorId: string | null): Observable<DirectorDetails> {
    return this.http.get<DirectorDetails>(`${environment.baseUrl}directors/${directorId}`);
  }
  postDirector(director: DirectorCreate): Observable<DirectorCreate> {
    return this.http.post<DirectorCreate>(`${environment.baseUrl}directors`, director);
  }
}
