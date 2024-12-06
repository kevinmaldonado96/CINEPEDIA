import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actor } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private apiUrl: string = environment.baseUrl + 'actors';

  constructor(private http: HttpClient) { }

  getActors(): Observable<Actor[]>{

    return this.http.get<Actor[]>(this.apiUrl);
  }

  getActorDetail(id: String): Observable<Actor>{
    return this.http.get<Actor>(this.apiUrl+`/${id}`);
  }

  createActor(actor: Actor): Observable<Actor>{
    return this.http.post<Actor>(this.apiUrl, actor);
  }

  associateMovie(idActor: string, idMovie: string): Observable<Actor> {
    return this.http.post<Actor>(this.apiUrl + "/" + idActor + "/movies/" + idMovie, {});
  }
}
