import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AssociateMovieWithActorComponent } from './associate-movie-with-actor.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Movie} from "../movie";
import {faker} from "@faker-js/faker";
import {YoutubeTrailer} from "../youtube-trailer";
import {Director} from "../../director/director";
import {Actor} from "../../actor/actor";
import {DebugElement} from "@angular/core";
import {of} from "rxjs";
import {ActorService} from "../../actor/actor.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
declare var window: any;

describe('AssociateMovieWithActorComponent', () => {
  let component: AssociateMovieWithActorComponent;
  let fixture: ComponentFixture<AssociateMovieWithActorComponent>;
  let actors: Array<Actor>;
  let debugElement: DebugElement;
  let service: ActorService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AssociateMovieWithActorComponent ],
      providers: [ActorService]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateMovieWithActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    actors = [];
    for (let i = 0; i < 10; i++) {

      let movie = Movie.fromAllAttributesInstance(
        faker.random.word(),
        faker.lorem.word(),
        faker.image.imageUrl(),
        Math.floor(Math.random() * (5 - 1 ) + 1),
        faker.lorem.words(5),
        faker.date.birthdate().toLocaleString(),
        Math.floor(Math.random() * (6 - 1 ) + 1),
        new YoutubeTrailer('','','',0,''),
        new Director('','','','',0),
        [],
        [],
        []
      );

      let actor = Actor.fromAllAttributes(
        faker.random.word(),
        faker.name.firstName(),
        faker.image.imageUrl(),
        faker.random.word(),
        faker.date.between('1990-01-01', '2023-04-22'),
        faker.lorem.paragraph(),
        [movie]
      );
      actors.push(actor);
    }
    debugElement = fixture.debugElement;
    service = TestBed.inject(ActorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find actor by id',  () => {
    let index = randomId(0, actors.length - 1);
    let actual: Actor = actors[index];
    expect(component.findActorById(actors, actual.id)).toEqual(actual);
  });

  it('should available actor in actors is true',  () => {
    let index = randomId(0, actors.length - 1);
    let actual: Actor = actors[index];
    expect(component.availableActors(actors, actual.id)).toBeTrue();
  });

  it('should available actor in actors is false',  () => {
    let index = randomId(0, actors.length - 1);
    let actual: Actor = actors[index];
    expect(component.availableActors(actors, faker.random.words(2))).toBeFalse();
  });

  it('should discard actors from movie', function () {
    let numberActorsInMovie = randomId(0, actors.length - 1);
    let actorsInMovie = actors.slice(numberActorsInMovie);
    let movie = Movie.fromAllAttributesInstance(
      faker.random.word(),
      faker.lorem.word(),
      faker.image.imageUrl(),
      Math.floor(Math.random() * (5 - 1 ) + 1),
      faker.lorem.words(5),
      faker.date.birthdate().toLocaleString(),
      Math.floor(Math.random() * (6 - 1 ) + 1),
      new YoutubeTrailer('','','',0,''),
      new Director('','','','',0),
      actorsInMovie,
      [],
      []
    );

    let expected = component.discardActors(actors, movie);

    expect(expected.length).toEqual(actors.length - actorsInMovie.length);

  });

  it('should actor selected',  () => {
    let index = randomId(0, actors.length - 1);
    let event = {
      target: {
        value: actors[index].id
      }
    }
    component.getIdActorSelected(event);
    fixture.detectChanges();
    expect(component.idActorSelected).toEqual(actors[index].id);
  });

  it('should sort asc by name', () => {
    let uniqueActorsName = actors.map(actor => actor.name)
      .sort();
    let index = randomId(0, actors.length - 1);
    let expected = component.sortActorsByName(actors);
    expect(expected[index].name).toEqual(uniqueActorsName[index]);
  });

  it('should search actor',  () => {
    let index = randomId(0, actors.length - 1);
    component.allActor = actors;
    component.searchActor(actors[index].name);
    fixture.detectChanges();
    expect(component.filteredActor.length).toBe(1);
  });

  it('validate error in getActors subscribe', fakeAsync(() => {
    //component = fixture.componentInstance;
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    //component.getActors();
    const req = httpTestingController.expectOne('http://localhost:4200/api/v1/actors');
    req.flush(null, errorResponse);
    tick(5000);
    fixture.detectChanges();
    expect(component.filteredActor.length).toEqual(0);

  }));

  it('validate success response in getActors subscribe', fakeAsync(() => {
    //component = fixture.componentInstance;
    const response = new HttpErrorResponse({
      error: '',
      status: 200,
      statusText: 'OK'
    });
    //component.getActors();
    const req = httpTestingController.expectOne('http://localhost:4200/api/v1/actors');
    req.flush(actors, response);
    tick(5000);
    fixture.detectChanges();
    expect(component.filteredActor.length).toEqual(actors.length);

  }));

  it('should not open actor modal',  () => {
    const response = new HttpErrorResponse({
      error: '',
      status: 200,
      statusText: 'OK'
    });
    //component.getActors();
    component.filteredActor = [];
    let movie = Movie.fromAllAttributesInstance(
      faker.random.word(),
      faker.lorem.word(),
      faker.image.imageUrl(),
      Math.floor(Math.random() * (5 - 1 ) + 1),
      faker.lorem.words(5),
      faker.date.birthdate().toLocaleString(),
      Math.floor(Math.random() * (6 - 1 ) + 1),
      new YoutubeTrailer('','','',0,''),
      new Director('','','','',0),
      [],
      [],
      []
    );
    component.openActorModal(movie);
    fixture.detectChanges();
    spyOn(Swal, 'fire');
    expect(Swal.fire).toBeTruthy();
  });

  it('should  open actor modal',  () => {
    const response = new HttpErrorResponse({
      error: '',
      status: 200,
      statusText: 'OK'
    });
    //component.getActors();
    component.filteredActor = actors;
    let movie = Movie.fromAllAttributesInstance(
      faker.random.word(),
      faker.lorem.word(),
      faker.image.imageUrl(),
      Math.floor(Math.random() * (5 - 1 ) + 1),
      faker.lorem.words(5),
      faker.date.birthdate().toLocaleString(),
      Math.floor(Math.random() * (6 - 1 ) + 1),
      new YoutubeTrailer('','','',0,''),
      new Director('','','','',0),
      [],
      [],
      []
    );
    spyOn(Swal, 'fire');
    component.openActorModal(movie);
    fixture.detectChanges();
    expect(Swal.fire).toHaveSize(0);
  });

  it('should associate movie with actor - there is not available actors', function () {
    component.filteredActor = [];
    spyOn(Swal, 'fire');
    component.associateActor('','');
    fixture.detectChanges();

    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should success associate movie with actor',  () => {
    component.filteredActor = actors;
    let actor = actors[randomId(0, actors.length - 1)]
    let idActor = actor.id;
    let idMovie = faker.datatype.uuid();
    spyOn(Swal, 'fire');
    component.associateActor(idActor, idMovie);
    const response = new HttpErrorResponse({
      error: '',
      status: 200,
      statusText: 'OK'
    });
    let url = 'http://localhost:4200/api/v1/actors/'+ idActor + '/movies/'+ idMovie;
    //component.getActors();
    const req = httpTestingController.expectOne(url);
    req.flush(actor, response);
    //tick(5000);
    fixture.detectChanges();
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should error associate movie with actor',  () => {
    component.filteredActor = actors;
    let actor = actors[randomId(0, actors.length - 1)]
    let idActor = actor.id;
    let idMovie = faker.datatype.uuid();
    spyOn(Swal, 'fire');
    component.associateActor(idActor, idMovie);
    const response = new HttpErrorResponse({
      error: '',
      status: 404,
      statusText: 'OK'
    });
    let url = 'http://localhost:4200/api/v1/actors/'+ idActor + '/movies/'+ idMovie;
    //component.getActors();
    const req = httpTestingController.expectOne(url);
    req.flush(actor, response);
    //tick(5000);
    fixture.detectChanges();
    expect(Swal.fire).toHaveBeenCalled();
  });

  const randomId =  (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});


