import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {YoutubeTrailer} from "./youtube-trailer";
import {faker} from "@faker-js/faker";
import {Movie} from "./movie";
import {Director} from "../director/director";
import {Actor} from "../actor/actor";
import {Review} from "./review";
import {Platform} from "../platform/platform";


describe('MovieService', () => {
  let service: MovieService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let movies: Array<Movie> = [];

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        MovieService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    });

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

    service = TestBed.inject(MovieService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies - success', () => {
    httpClientSpy.get.and.returnValue(of(movies));
    service.getMovies().subscribe((data) => {
      expect(data).toEqual(movies);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get movie by id', () => {
    let moviePosition = Math.floor(Math.random() * (movies.length - 1));
    httpClientSpy.get.and.returnValue(of(movies[moviePosition]));
    service.getMovieById(movies[moviePosition].id).subscribe((data) => {
      expect(data).toEqual(movies[moviePosition]);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
