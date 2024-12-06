import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { ListMoviesComponent } from './list-movies.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Movie} from "../movie";
import {YoutubeTrailer} from "../youtube-trailer";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {MovieService} from "../movie.service";
import {MovieFilter} from "../movie-filter";
import {HttpErrorResponse} from "@angular/common/http";
import {of} from "rxjs";
import {Director} from "../../director/director";
import {Actor} from "../../actor/actor";
import {Review} from "../review";
import {MoviePlatform} from "../Movie-platform";
import {MovieActor} from "../MovieActor";
import {Platform} from "../../platform/platform";

describe('ListMoviesComponent', () => {
  let component: ListMoviesComponent;
  let fixture: ComponentFixture<ListMoviesComponent>;
  let debug: DebugElement;
  let movies: Array<Movie> = [];
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMoviesComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [MovieService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMoviesComponent);
    movies = [];
    for (let i = 0; i < 10; i++) {
      let youtubeTrailer = new YoutubeTrailer(
        faker.random.word(),
        faker.name.firstName(),
        faker.image.imageUrl(),
        Math.floor(Math.random() * (5 - 1 ) + 1),
        faker.random.word(),
      );
      let director = new Director(
        faker.random.word(),
        faker.name.fullName(),
        faker.image.imageUrl(),
        faker.random.word(),
        faker.datatype.number(100)
      );
      let actors = [
        Actor.fromAllAttributes(
          faker.random.word(),
          faker.name.fullName(),
          faker.image.imageUrl(),
          faker.random.word(),
          faker.date.birthdate(),
          faker.random.word(),
          []
        )
      ]
      let platform = [
        Platform.fromAllAttributesInstance(
          faker.random.word(),
          faker.random.word(),
          faker.internet.url()
        )
      ]
      let reviews = [
        new Review(
          faker.random.word(),
          faker.random.word(),
          Math.floor(Math.random() * (6 - 1 ) + 1),
          faker.name.fullName()
        )
      ]
      let movie = Movie.fromAllAttributesInstance(
        faker.random.word(),
        faker.helpers.unique(faker.name.fullName),
        faker.image.imageUrl(),
        Math.floor(Math.random() * (5 - 1 ) + 1),
        faker.lorem.words(5),
        faker.date.birthdate().toLocaleString(),
        Math.floor(Math.random() * (6 - 1 ) + 1),
        youtubeTrailer,
        director,
        actors,
        platform,
        reviews
      );
      movies.push(movie);
    }

    debug = fixture.debugElement;
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should create-platform', () => {
    initializeMocks();
    expect(component).toBeTruthy();
  });

  it('init components', () => {
    initializeMocks();
    let buttonDropdown = debug.query(By.css('button.dropdown-toggle'));
    expect(buttonDropdown.nativeElement.textContent).toEqual(' --  Ordenar por  -- ');
    expect(debug.queryAll(By.css('li.dropdown-item'))).toHaveSize(component.filters.length);
    expect(debug.queryAll(By.css('app-card-movie'))).toHaveSize(10);
    expect(component.filters.length).toBe(3);
  });

  it('validate error in getMovies subscribe', fakeAsync(() => {
    component = fixture.componentInstance;
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    component.getMovies();
    const req = httpTestingController.expectOne('http://localhost:4200/api/v1/movies');
    req.flush(null, errorResponse);
    tick(2000);
    fixture.detectChanges();
    expect(debug.queryAll(By.css('div.without-movies'))).toHaveSize(1);
  }));

  //fakeasync and tick simulate settimeout when late the server response in list movies get
  it('should load initial movies', fakeAsync(() => {
    initializeMocks();
    tick(2000);
    fixture.detectChanges();
    expect(debug.queryAll(By.css('app-card-movie'))).toHaveSize(10);
    expect(component.allMovies.length).toEqual(10);
    expect(component.loading).toEqual(false);
  }));

  it('should sort asc by filter duration', () => {
    initializeMocks();
    component.selectValue(new MovieFilter('duration', 'Duración'));
    let uniqueDurations = movies.map(movie => movie.duration)
      .filter((duration, index, numbers) => numbers.indexOf(duration) == index);
    component.sortMoviesByDuration(movies);
    fixture.detectChanges();
    expect(component.filteredMovies[0].duration).toEqual(Math.min(...uniqueDurations));
    let buttonDropdown = debug.query(By.css('button.dropdown-toggle'));
    expect(buttonDropdown.nativeElement.textContent).toEqual(' Ordenadas por: Duración ');
  });

  it('should sort asc by filter popularity', () => {
    initializeMocks();
    component.selectValue(new MovieFilter('popularity', 'Calificación'));
    let uniquePopularities = movies.map(movie => movie.popularity)
      .filter((popularity, index, numbers) => numbers.indexOf(popularity) == index);
    component.sortMoviesByPopularity(movies);
    fixture.detectChanges();
    expect(component.filteredMovies[0].popularity).toEqual(Math.min(...uniquePopularities));
    let buttonDropdown = debug.query(By.css('button.dropdown-toggle'));
    expect(buttonDropdown.nativeElement.textContent).toEqual(' Ordenadas por: Calificación ');
  });

  it('should sort asc by filter title', () => {
    initializeMocks();
    component.selectValue(new MovieFilter('title', 'Nombre'));
    let uniqueTitles = movies.map(movie => movie.title)
      .sort();
    component.sortMoviesByName(movies);
    fixture.detectChanges();
    expect(component.filteredMovies[0].title).toEqual(uniqueTitles[0]);
    let buttonDropdown = debug.query(By.css('button.dropdown-toggle'));
    expect(buttonDropdown.nativeElement.textContent).toEqual(' Ordenadas por: Nombre ');
  });

  it('should search movie by name', () => {
    initializeMocks();
    component.searchMovie(movies[0].title);
    fixture.detectChanges();
    expect(component.filteredMovies.length).toBe(1);
    let buttonDropdown = debug.query(By.css('button.dropdown-toggle'));
    expect(buttonDropdown.nativeElement.textContent).toEqual(' --  Ordenar por  -- ');
  });

  it('should get id platform associates to movie',  () => {
    initializeMocks();
    let index = randomId(0, movies.length - 1);
    let movieId = movies[index].id;
    let platform = Platform.fromAllAttributesInstance(
      faker.datatype.uuid(),
      faker.random.word(),
      faker.internet.url()
    );
    component.filteredMovies = movies;
    fixture.detectChanges();
    let moviePlatform = MoviePlatform.fromAllAttributesInstance(
      movieId,
      platform
    );
    component.getIdPlatformAssociatedToMovie(moviePlatform);
    expect(component.filteredMovies[index].platforms.includes(platform)).toBeTrue();
  });

  it('should get id actor associates to movie',  () => {
    initializeMocks();
    let index = randomId(0, movies.length - 1);
    let movieId = movies[index].id;
    let actor = Actor.fromAllAttributes(
      faker.datatype.uuid(),
      faker.name.fullName(),
      faker.image.imageUrl(),
      faker.random.word(),
      faker.date.birthdate(),
      faker.random.word(),
      []
    );
    component.filteredMovies = movies;
    fixture.detectChanges();
    let movieActor = MovieActor.fromAllAttributesInstance(
      movieId,
      actor
    );
    component.getIdActorAssociatedToMovie(movieActor);
    expect(component.filteredMovies[index].actors.includes(actor)).toBeTrue();
  });

  const initializeMocks = () => {
    spyOn(service, "getMovies").and.returnValue(of(movies));
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  const randomId =  (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});


