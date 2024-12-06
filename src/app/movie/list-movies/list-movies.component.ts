import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {MovieFilter} from "../movie-filter";
import {MovieService} from "../movie.service";
import {Movie} from "../movie";
import {AssociateWithPlatformComponent} from "../associate-with-platform/associate-with-platform.component";
import {PlatformService} from "../../platform/platform.service";
import {MoviePlatform} from "../Movie-platform";
import {MovieActor} from "../MovieActor";
import {AssociateMovieWithActorComponent} from "../associate-movie-with-actor/associate-movie-with-actor.component";
import {ActorService} from "../../actor/actor.service";


@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})

export class ListMoviesComponent implements OnInit, AfterViewInit {
  @ViewChild(AssociateWithPlatformComponent) associateWithPlatformComponent: AssociateWithPlatformComponent;
  @ViewChild(AssociateMovieWithActorComponent) associateMovieWithActorComponent: AssociateMovieWithActorComponent;
  public loading = false;
  search: string = '';
  placeholderSearchMovie: string;
  allMovies: Array<Movie> = [];
  filteredMovies: Array<Movie> = [];
  selectedValue: string;
  filters: Array<MovieFilter> = [];

  public animationTypes = ngxLoadingAnimationTypes;

  constructor(private movieService: MovieService, private platformService: PlatformService, private actorService:ActorService) {
    this.associateWithPlatformComponent = new AssociateWithPlatformComponent(platformService);
    this.associateMovieWithActorComponent = new AssociateMovieWithActorComponent(actorService);
    this.placeholderSearchMovie = $localize`:@@verb.search:Buscar` + ' ' + $localize`:@@word.movie:película`;
    this.selectedValue = $localize`:@@movie-filter.sort-by:--  Ordenar por  --`;
    this.filters = [
      new MovieFilter('title', $localize`:@@movie-filter.title:Nombre`),
      new MovieFilter('duration', $localize`:@@movie-filter.duration:Duración`),
      new MovieFilter('popularity', $localize`:@@movie-filter.rating:Calificación`)
  ];
  }

  ngAfterViewInit(): void {
    this.associateWithPlatformComponent = new AssociateWithPlatformComponent(this.platformService);
    this.associateMovieWithActorComponent = new AssociateMovieWithActorComponent(this.actorService);
  }

  ngOnInit(): void {
    this.getMovies();

  }

  selectValue(filter: MovieFilter) {
    this.selectedValue = $localize`:@@movie-filter.sorted-by:Ordenadas por: ` + filter.name;
    switch (filter.key) {
      case 'title':
        this.sortMoviesByName(this.filteredMovies);
        break;
      case 'duration':
        this.sortMoviesByDuration(this.filteredMovies);
        break;
      case 'popularity':
        this.sortMoviesByPopularity(this.filteredMovies);
        break;
    }
  }

  getMovies(): void {
    this.loading = true;
    let movies = this.movieService.getMovies();
    movies.subscribe(
      {
        next: data => {
          this.allMovies = data;
          this.filteredMovies = data;
          //Simular retardo en el servicio
          setTimeout(() => this.loading = false, 2000);
          //this.loading = false
        },
        error: () => {
          this.loading = false
          Swal.fire({
            title: $localize`:@@sweet-alert.error-message:No es posible obtener el listado de` + ' ' + $localize`:@@verb.movie-plural:películas`,
            text: $localize`:@@try-later:Inténtalo más tarde`,
            icon: 'error',
            confirmButtonText: $localize`:@@btn-accept:Aceptar`
          });
        }
      }
    )
  }

  openActorModal(movie: Movie) {
    this.associateMovieWithActorComponent.openActorModal(movie);
  }

  openPlatformModal(movie: Movie) {
    this.associateWithPlatformComponent.openPlatformModal(movie);
  }

  sortMoviesByName(movies: Array<Movie>) {
    movies.sort((m1, m2) => (m1.title > m2.title ? 1 : -1));
  }

  sortMoviesByDuration(movies: Array<Movie>) {
    movies.sort((m1, m2) => (m1.duration > m2.duration ? 1 : -1));
  }

  sortMoviesByPopularity(movies: Array<Movie>) {
    movies.sort((m1, m2) => (m1.popularity > m2.popularity ? 1 : -1));
  }

  searchMovie(name: string) {
    this.filteredMovies = this.allMovies.filter(movie => {
      return movie.title.toLowerCase().includes(name.toLowerCase())
    });
    this.selectedValue = $localize`:@@movie-filter.sort-by:--  Ordenar por  --`;
  }

  getIdPlatformAssociatedToMovie(event: any) {
    let moviePlatform: MoviePlatform = event as MoviePlatform;
    this.filteredMovies = this.addPlatformToMovie(this.filteredMovies, moviePlatform);
  }

  getIdActorAssociatedToMovie(event: any) {
    let movieActor: MovieActor = event as MovieActor;
    this.filteredMovies = this.addActorToMovie(this.filteredMovies, movieActor);
  }

  addPlatformToMovie(movies: Array<Movie>, moviePlatform: MoviePlatform) {
    movies = movies.map(x => {
      if (x.id == moviePlatform.idMovie) {
        x.platforms.push(moviePlatform.platform);
      }
      return x;
    });
    return movies;
  }

  addActorToMovie(movies: Array<Movie>, movieActor: MovieActor) {
    movies = movies.map(x => {
      if (x.id == movieActor.idMovie) {
        x.actors.push(movieActor.actor);
      }
      return x;
    });
    return movies;
  }
}
