import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListMoviesComponent} from "./movie/list-movies/list-movies.component";
import { ListarComponent } from './actor/listar-actores/listar/listar.component';
import { DirectorListComponent } from './director/director-list/director-list.component';
import { DetailMovieComponent} from "./movie/detail-movie/detail-movie.component";
import { DirectorDetailComponent } from './director/director-detail/director-detail.component';
import { HomeComponent } from './home/home.component';
import { ActorDetailComponent } from './actor/actor-detail/actor-detail.component';
import { ListPlatformComponent } from './platform/list-platform/list-platform.component';

const routes: Routes = [
  { path: 'actors', component: ListarComponent},
  { path: 'actor/:id', component: ActorDetailComponent},
  { path: 'directors', component: DirectorListComponent },
  { path: 'director/:directorId', component: DirectorDetailComponent },
  { path: 'director', component: DirectorDetailComponent },
  { path: 'movies', component: ListMoviesComponent, pathMatch: 'full' },
  { path: 'movie/:id', component: DetailMovieComponent, pathMatch: 'full'},
  { path: 'platforms', component: ListPlatformComponent},
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
