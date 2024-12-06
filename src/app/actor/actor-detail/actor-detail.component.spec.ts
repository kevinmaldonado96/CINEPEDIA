import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorDetailComponent } from './actor-detail.component';
import { ActorService } from '../actor.service';
import { of, throwError } from 'rxjs';
import { faker } from '@faker-js/faker';
import { Movie } from 'src/app/movie/movie';
import { Actor } from '../actor';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { YoutubeTrailer } from 'src/app/movie/youtube-trailer';
import { Director } from 'src/app/director/director';
import { ActorModule } from '../actor.module';

describe('ActorDetailComponent', () => {
  let component: ActorDetailComponent;
  let fixture: ComponentFixture<ActorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorDetailComponent ],
      imports: [HttpClientModule, NgxLoadingModule, FormsModule, RouterTestingModule, ActorModule],
      providers: [ActorService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-platform', () => {
    expect(component).toBeTruthy();
  });

  it('test_get_actor_detail_successfully', () => {
    let service: ActorService;

     let actor = Actor.fromAllAttributes(
        '1',
        'test name',
        'test.jpg',
        faker.random.word(),
        faker.date.between('1990-01-01', '2023-04-22'),
        faker.lorem.paragraph(),
        []
      );

    service = TestBed.inject(ActorService);
    spyOn(service, 'getActorDetail').and.returnValue(of(actor));
    component.getActorDetail('1');
    expect(component.actorDetail).toBeDefined();
    expect(component.actorDetail?.name).toBe('test name');
  });

  it('test_get_actor_empty_id', () => {
    component.getInvalidActor();
    expect(component.actorDetail).toBeUndefined();
  });

  it('test_get_actor_from_filters', () => {
    let service: ActorService;
    let actors = [];

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
        faker.name.firstName(),
        'test.jpg',
        faker.random.word(),
        faker.date.between('1990-01-01', '2023-04-22'),
        faker.lorem.paragraph(),
        [movie]
      );

    service = TestBed.inject(ActorService);
    spyOn(service, 'getActorDetail').and.returnValue(of(actor));
    component.getActorFromFilters('1');
    expect(component.actorDetail).toBeDefined();
    expect(component.actorDetail?.name).toBe(actor.name);
  });

  it('test_popUp_show', () => {
    component = fixture.componentInstance;
    spyOn(Swal, 'fire');
    component.showPopUpError('Error');
    expect(Swal.fire).toHaveBeenCalled();
  });


});

