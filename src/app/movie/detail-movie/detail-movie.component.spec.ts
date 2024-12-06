import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import Swal from "sweetalert2";

import { DetailMovieComponent } from './detail-movie.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MovieService} from "../movie.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {faker} from "@faker-js/faker";
import {DebugElement} from "@angular/core";
import {YoutubeTrailer} from "../youtube-trailer";
import {Director} from "../../director/director";
import {Actor} from "../../actor/actor";
import {Review} from "../review";
import {Movie} from "../movie";
import {of} from "rxjs";
import {Platform} from "../../platform/platform";


describe('DetailMovieComponent', () => {
  let component: DetailMovieComponent;
  let fixture: ComponentFixture<DetailMovieComponent>;
  let debug: DebugElement;
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMovieComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [MovieService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create-platform', () => {
    expect(component).toBeTruthy();
  });

  it('shold back button redirect to movies', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.backToMovies();
    expect(spy.calls.first().args[0]).toContain('movies');
  }));

  it('validate error in getMovieById subscribe', fakeAsync(inject([Router], (mockRouter: Router) => {
    component = fixture.componentInstance;
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    let id = faker.datatype.uuid();
    component.movieDetail(id);
    spyOn(Swal, 'fire');
    const req = httpTestingController.expectOne('http://localhost:4200/api/v1/movies/' + id);
    req.flush(null, errorResponse);
    fixture.detectChanges();
    expect(spy.calls.first().args[0]).toContain('movies');
  })));

  it('should validate onInit',  ()  => {
    let mockMovie = movie();
    spyOn(service, "getMovieById").and.returnValue(of(mockMovie));
    component.ngOnInit();
    fixture.detectChanges();
    let element = debug.nativeElement.querySelector("#container-detail-movie");
    console.log(element.getAttribute('style'));
    expect(element.getAttribute('style')).toEqual(`background-image: url("${component.movie.poster}");`);
  });

  it('should create-platform range', () => {
    expect(component.createRange(3)).toEqual([1,1,1,0,0]);
  });

  const movie = () => {
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
      return Movie.fromAllAttributesInstance(
        faker.random.word(),
        faker.helpers.unique(faker.name.fullName),
        faker.image.imageUrl(),
        Math.floor(Math.random() * (5 - 1 ) + 1),
        faker.lorem.words(5),
        faker.date.recent().toString(),
        Math.floor(Math.random() * (6 - 1 ) + 1),
        youtubeTrailer,
        director,
        actors,
        platform,
        reviews
      );
  }
});
