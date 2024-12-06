import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Platform} from "./platform";

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private apiUrl: string = environment.baseUrl + 'platforms';

  constructor(private http: HttpClient) { }

  getPlatform(): Observable<Platform[]>{
    return this.http.get<Platform[]>(this.apiUrl);
  }

  createPlatform(platform: Platform): Observable<Platform>{
    return this.http.post<Platform>(this.apiUrl, platform);
  }

  findAll(): Observable<Platform[]> {
    return this.http.get<Platform[]>(this.apiUrl);
  }

  associateMovie(idPlatform: string, idMovie: string): Observable<Platform> {
    return this.http.post<Platform>(this.apiUrl + "/" + idPlatform + "/movies/" + idMovie, {});
  }
}
