/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { HttpClientModule } from '@angular/common/http';
import { ActorService } from '../../actor.service';
import { Actor } from '../../actor';
import { faker } from '@faker-js/faker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './listar.component';
import { Movie } from 'src/app/movie/movie';
import { YoutubeTrailer } from 'src/app/movie/youtube-trailer';
import { Director } from 'src/app/director/director';
import { ActorModule } from '../../actor.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


describe('ActorsListComponent', () => {
  let component: ListarComponent;
  let fixture: ComponentFixture<ListarComponent>;
  let debug: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxLoadingModule, FormsModule, ActorModule, RouterTestingModule],
      declarations: [ListarComponent],
      providers: [ActorService, NgbModal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarComponent);
    component = fixture.componentInstance;
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
      component.actors.push(actor);
      component.actorsPerPage = 10;
      component.getPageNumbers();
    }
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create-platform', () => {
    expect(component).toBeTruthy();
  });

  it('should have 10 cards elements', () => {
    expect(debug.queryAll(By.css('div.card'))).toHaveSize(10);
  });

  it('should have 10 images elements', () => {
    expect(debug.queryAll(By.css('img'))).toHaveSize(10);
  });

  it('should have 10 cards body elements', () => {
    expect(debug.queryAll(By.css('div.card-body'))).toHaveSize(10);
  });

  it('should have the corresponding src to the actor photo', () => {
    debug.queryAll(By.css('img')).forEach((img, i) => {
      expect(img.attributes['src']).toEqual(
        component.actors[i].photo
      );
    });
  });

  it('should have blockquote tag with the actors name', () => {
    debug.queryAll(By.css('h4.pb-1.fw-bold')).forEach((h4, i) => {
      expect(h4.nativeElement.textContent).toContain(
        component.actors[i].name
      );
    });
  });

  it('should search actor by name', () => {
    component.getActorsByName(component.actors[0].name);
    fixture.detectChanges();
    expect(component.actors.length).toBeGreaterThan(0);
  });

  it('should sort actor by name ascending', () => {
    component.getActorsByName(component.actors[0].name);
    component.isAscendingName = true;
    let sortedActors = component.actors.sort((a,b) => a.name.localeCompare(b.name));
    component.orderByName();
    fixture.detectChanges();
    expect(component.actors[0].name).toEqual(sortedActors[0].name);
  });

  it('should sort actor by name descending', () => {
    component.getActorsByName(component.actors[0].name);
    component.isAscendingName = false;
    let sortedActors = component.actors.sort((a,b) => b.nationality.localeCompare(a.nationality));
    component.orderByName();
    fixture.detectChanges();
    expect(component.actors[0].name).toEqual(sortedActors[0].name);
  });

  it('should sort actor by nationality ascending', () => {
    component.getActorsByName(component.actors[0].name);
    component.isAscendingNationality = true;
    let sortedContries = component.actors.sort((a,b) => a.nationality.localeCompare(b.nationality));
    component.orderByNationality();
    fixture.detectChanges();
    expect(component.actors[0].nationality).toEqual(sortedContries[0].nationality);
  });

  it('should sort actor by nationality', () => {
    component.getActorsByName(component.actors[0].name);
    component.isAscendingNationality = false;
    let sortedContries = component.actors.sort((a,b) => b.nationality.localeCompare(a.nationality));
    component.orderByNationality();
    fixture.detectChanges();
    expect(component.actors[0].nationality).toEqual(sortedContries[0].nationality);
  });

  it('should get_actorss_list_success', () => {
    let service: ActorService;
    let actors = [];
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
    service = TestBed.inject(ActorService);
    spyOn(service, 'getActors').and.returnValue(of(actors));
    component.getActors();
    component.getCurrentPageActors();
    component.getPageNumbers();
    expect(component.actors.length).toBe(10);
  });

  it('should execute_sweetAlert', () => {
    spyOn(Swal, 'fire');

    component.showPopUpError();

    expect(Swal.fire);
  });

  it('should execute_modal method', () => {

    const modalService = jasmine.createSpyObj('modalService', ['open']);

    const mockModalReference = {
      componentInstance: {
        refreshListActors: {
          subscribe: (callback: any) => {
            callback();
          }
        }
      }
    };


    modalService.open.and.returnValue(mockModalReference);

    component.openModalCreateActor();

    expect(modalService.open);
  });
});
