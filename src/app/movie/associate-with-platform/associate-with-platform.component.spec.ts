import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AssociateWithPlatformComponent } from './associate-with-platform.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Platform} from "../../platform/platform";
import {PlatformService} from "../../platform/platform.service";
import {DebugElement} from "@angular/core";
import {faker} from "@faker-js/faker";
import {Actor} from "../../actor/actor";
import {Movie} from "../movie";
import {YoutubeTrailer} from "../youtube-trailer";
import {Director} from "../../director/director";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

describe('AssociateWithPlatformComponent', () => {
  let component: AssociateWithPlatformComponent;
  let fixture: ComponentFixture<AssociateWithPlatformComponent>;
  let platforms: Array<Platform>;
  let service: PlatformService;
  let debugElement: DebugElement;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AssociateWithPlatformComponent ],
      providers: [PlatformService]
    })
    .compileComponents();
    httpTestingController = TestBed.inject((HttpTestingController));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateWithPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    platforms = [];

    for (let i = 0; i < 10; i++) {

      let platform = Platform.fromAllAttributesInstance(
        `${i}`,
        faker.random.word(),
        faker.image.imageUrl(),
      );

      platforms.push(platform);
    }
  });

  it('should create-platform', () => {
    expect(component).toBeTruthy();
  });

  it('should find platform by id',  () => {
    let index = randomId(0, platforms.length - 1);
    let actual: Platform = platforms[index];
    expect(component.findPlatformById(platforms, actual.id)).toEqual(actual);
  });

  it('should available platform in platforms is true',  () => {
    let index = randomId(0, platforms.length - 1);
    let actual: Platform = platforms[index];
    expect(component.availablePlatforms(platforms, actual.id)).toBeTrue();
  });


  it('should available platform in platforms is false',  () => {
    let index = randomId(0, platforms.length - 1);
    let actual: Platform = platforms[index];
    expect(component.availablePlatforms(platforms, faker.random.words(2))).toBeFalse();
  });

  it('should discard platforms from movie', function () {
    let numberPlatformsInMovie = randomId(0, platforms.length - 1);
    let platformsInMovie = platforms.slice(numberPlatformsInMovie);
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
      platformsInMovie,
      []
    );

    let expected = component.discardPlatforms(platforms, movie);

    expect(expected.length).toEqual(platforms.length - platformsInMovie.length);

  });

  it('should actor selected',  () => {
    let index = randomId(0, platforms.length - 1);
    let event = {
      target: {
        value: platforms[index].id
      }
    }
    component.getIdPlatformSelected(event);
    fixture.detectChanges();
    expect(component.idPlatformSelected).toEqual(platforms[index].id);
  });

  it('should sort asc by name', () => {
    let uniqueplatformsName = platforms.map(actor => actor.name)
      .sort();
    let index = randomId(0, platforms.length - 1);
    let expected = component.sortPlatformsByName(platforms);
    expect(expected[index].name).toEqual(uniqueplatformsName[index]);
  });

  it('should search actor',  () => {
    let index = randomId(0, platforms.length - 1);
    component.allPlatform = platforms;
    component.searchPlatform(platforms[index].name);
    fixture.detectChanges();
    expect(component.filteredPlatform.length).toBe(1);
  });

  it('validate error in getplatforms subscribe', fakeAsync(() => {
    //component = fixture.componentInstance;
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    //component.getplatforms();
    const req = httpTestingController.expectOne('http://localhost:4200/api/v1/platforms');
    req.flush(null, errorResponse);
    tick(5000);
    fixture.detectChanges();
    expect(component.filteredPlatform.length).toEqual(0);

  }));

  it('validate success response in getplatforms subscribe', fakeAsync(() => {
    //component = fixture.componentInstance;
    const response = new HttpErrorResponse({
      error: '',
      status: 200,
      statusText: 'OK'
    });
    //component.getplatforms();
    const req = httpTestingController.expectOne('http://localhost:4200/api/v1/platforms');
    req.flush(platforms, response);
    tick(5000);
    fixture.detectChanges();
    expect(component.filteredPlatform.length).toEqual(platforms.length);

  }));

  it('should not open actor modal',  () => {
    const response = new HttpErrorResponse({
      error: '',
      status: 200,
      statusText: 'OK'
    });
    //component.getplatforms();
    component.filteredPlatform = [];
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
    component.openPlatformModal(movie);
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
    //component.getplatforms();
    component.filteredPlatform = platforms;
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
    component.openPlatformModal(movie);
    fixture.detectChanges();
    expect(Swal.fire).toHaveSize(0);
  });

  it('should associate movie with actor - there is not available platforms', function () {
    component.filteredPlatform = [];
    spyOn(Swal, 'fire');
    component.associatePlatform('','');
    fixture.detectChanges();

    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should success associate movie with actor',  () => {
    component.filteredPlatform = platforms;
    let actor = platforms[randomId(0, platforms.length - 1)]
    let idPlatform = actor.id;
    let idMovie = faker.datatype.uuid();
    spyOn(Swal, 'fire');
    component.associatePlatform(idPlatform, idMovie);
    const response = new HttpErrorResponse({
      error: '',
      status: 200,
      statusText: 'OK'
    });
    let url = 'http://localhost:4200/api/v1/platforms/'+ idPlatform + '/movies/'+ idMovie;
    //component.getplatforms();
    const req = httpTestingController.expectOne(url);
    req.flush(actor, response);
    //tick(5000);
    fixture.detectChanges();
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should error associate movie with actor',  () => {
    component.filteredPlatform = platforms;
    let actor = platforms[randomId(0, platforms.length - 1)]
    let idPlatform = actor.id;
    let idMovie = faker.datatype.uuid();
    spyOn(Swal, 'fire');
    component.associatePlatform(idPlatform, idMovie);
    const response = new HttpErrorResponse({
      error: '',
      status: 404,
      statusText: 'OK'
    });
    let url = 'http://localhost:4200/api/v1/platforms/'+ idPlatform + '/movies/'+ idMovie;
    //component.getplatforms();
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
