import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorDetailFilterComponent } from './actor-detail-filter.component';
import { ActorService } from '../actor.service';
import { Actor } from '../actor';
import { Movie } from 'src/app/movie/movie';
import { faker } from '@faker-js/faker';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { YoutubeTrailer } from 'src/app/movie/youtube-trailer';
import { Director } from 'src/app/director/director';
import { ActorModule } from '../actor.module';

describe('ActorDetailFilterComponent', () => {
  let component: ActorDetailFilterComponent;
  let fixture: ComponentFixture<ActorDetailFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorDetailFilterComponent ],
      imports: [HttpClientModule, NgxLoadingModule, FormsModule, RouterTestingModule, ActorModule],
      providers: [ActorService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorDetailFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-platform', () => {
    expect(component).toBeTruthy();
  });


  it('test_get_actors_list_success', () => {
    let service: ActorService;
    let actors = [];
    for (let i = 0; i <10; i++) {
      let movie = Movie.fromAllAttributesInstance(
        faker.random.word(),
        '',
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

      let actor =  Actor.fromAllAttributes(
        faker.random.word(),
        faker.random.word(),
        'test.jpg',
        faker.random.word(),
        faker.date.between('1990-01-01', '2023-04-22'),
        faker.lorem.paragraph(),
        [movie]
      );
      console.log(actor);
      actors.push(actor);
    }
    service = TestBed.inject(ActorService);
    spyOn(service, 'getActors').and.returnValue(of(actors));
    component.getActors();
    expect(component.actors.length).toBe(10);
  });

  it('should search actors by name', () => {
    let service: ActorService;
    let actors = [];
    for (let i = 0; i <10; i++) {
      let movie = Movie.fromAllAttributesInstance(
        faker.random.word(),
        '',
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
        faker.random.word(),
        'test.jpg',
        faker.random.word(),
        faker.date.between('1990-01-01', '2023-04-22'),
        faker.lorem.paragraph(),
        [movie]
      );
      console.log(actor);
      actors.push(actor);
    }
    service = TestBed.inject(ActorService);
    spyOn(service, 'getActors').and.returnValue(of(actors));
    component.getActors();

    component.getActorsByName(component.actors[0].name);
    fixture.detectChanges();
    expect(component.actors.length).toBeGreaterThan(0);
  });

  it('should sort actors by name', () => {

    let service: ActorService;
    let actors = [];
    for (let i = 0; i <10; i++) {
      let movie = Movie.fromAllAttributesInstance(
        faker.random.word(),
        '',
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
        faker.random.word(),
        'test.jpg',
        faker.random.word(),
        faker.date.between('1990-01-01', '2023-04-22'),
        faker.lorem.paragraph(),
        [movie]
      );
      console.log(actor);
      actors.push(actor);
    }
    service = TestBed.inject(ActorService);
    spyOn(service, 'getActors').and.returnValue(of(actors));
    component.getActors();

    component.getActorsByName(component.actors[0].name);
    let sortedNames = component.actors
      .map((actor) => actor.name)
      .sort();
    component.sortByName();
    fixture.detectChanges();
    expect(component.actors[0].name).toEqual(sortedNames[0]);
  });

  it('should sort actors by nationality', () => {

    let service: ActorService;
    let actors = [];
    for (let i = 0; i <10; i++) {
      let movie = Movie.fromAllAttributesInstance(
        faker.random.word(),
        '',
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
        faker.random.word(),
        'test.jpg',
        faker.random.word(),
        faker.date.between('1990-01-01', '2023-04-22'),
        faker.lorem.paragraph(),
        [movie]
      );
      console.log(actor);
      actors.push(actor);
    }
    service = TestBed.inject(ActorService);
    spyOn(service, 'getActors').and.returnValue(of(actors));
    component.getActors();

    component.getActorsByName(component.actors[0].name);

    let sortedContries = component.actors
      .map((actor) => actor.nationality)
      .sort();
    component.sortByContry();
    fixture.detectChanges();
    expect(component.actors[0].nationality).toEqual(
      sortedContries[0]
    );
  });

  it('should get_actors_list_success', () => {
    let service: ActorService;
    let actors = [];
    for (let i = 0; i < 2; i++) {
      let movie = Movie.fromAllAttributesInstance(
        faker.random.word(),
        faker.unique(faker.lorem.word),
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
        faker.random.word(),
        'test.jpg',
        faker.random.word(),
        faker.date.between('1990-01-01', '2023-04-22'),
        faker.lorem.paragraph(),
        [movie]
      );
      actors.push(actor);
    }
    service = TestBed.inject(ActorService);
    spyOn(service, 'getActors').and.returnValue(of(actors));
    component.getActors();
    expect(component.actors.length).toBe(2);
  });

  it('should set id actor', () => {
    component.selectActor('testId');
    expect(component.actorId).toEqual('testId');
  });
});
