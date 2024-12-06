import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListMoviesComponent} from "./list-movies/list-movies.component";
import { CardMovieComponent } from './card-movie/card-movie.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgxLoadingModule} from "ngx-loading";
import { DetailMovieComponent } from './detail-movie/detail-movie.component';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuModule} from "@angular/material/menu";
import {AssociateWithPlatformComponent} from "./associate-with-platform/associate-with-platform.component";
import { AssociateMovieWithActorComponent } from './associate-movie-with-actor/associate-movie-with-actor.component';



@NgModule({
  declarations: [
    ListMoviesComponent,
    CardMovieComponent,
    DetailMovieComponent,
    AssociateWithPlatformComponent,
    AssociateMovieWithActorComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatMenuModule,
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    ListMoviesComponent
  ]
})
export class MovieModule { }
