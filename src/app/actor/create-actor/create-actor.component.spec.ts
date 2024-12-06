import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActorComponent } from './create-actor.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActorService } from '../actor.service';
import { Actor } from '../actor';
import { faker } from '@faker-js/faker';
import { of, throwError } from 'rxjs';
import { ActorModule } from '../actor.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateActorComponent', () => {
  let component: CreateActorComponent;
  let fixture: ComponentFixture<CreateActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateActorComponent ],
      imports: [HttpClientModule, NgxLoadingModule, ReactiveFormsModule, FormsModule, NgbModule, ActorModule, RouterTestingModule],
      providers: [NgbActiveModal, ActorService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('test successful construction of the form', () => {
    const form = component.actorForm;
    expect(form).toBeDefined();
  });
  it('test empty values ​​on the form', () => {
    const form = component.actorForm;
    const nameControl = form.controls['name'];
    nameControl.setValue('');
    expect(nameControl).toBeDefined();
    expect(nameControl.valid).toBeFalsy();

    const photoControl = form.controls['photo'];
    photoControl.setValue('');
    expect(photoControl).toBeDefined();
    expect(photoControl.valid).toBeFalsy();

    const nationalityControl = form.controls['nationality'];
    nationalityControl.setValue('');
    expect(nationalityControl).toBeDefined();
    expect(nationalityControl.valid).toBeFalsy();

    const birthDateControl = form.controls['birthDate'];
    birthDateControl.setValue('');
    expect(birthDateControl).toBeDefined();
    expect(birthDateControl.valid).toBeFalsy();

    const biographyControl = form.controls['biography'];
    biographyControl.setValue('');
    expect(biographyControl).toBeDefined();
    expect(biographyControl.valid).toBeFalsy();

  });
  it('test invalid url form', () => {
    const form = component.actorForm;

    const photoControl = form.controls['photo'];
    photoControl.setValue(faker.random.word());
    expect(photoControl).toBeDefined();
    expect(photoControl.valid).toBeFalsy();

  });
  it('test invalid lenght fields', () => {
    const form = component.actorForm;

    let value = '';
    for (let index = 0; index < 260; index++) {
      value += faker.lorem.word();

    }

    const nameControl = form.controls['name'];
    nameControl.setValue(value);
    expect(nameControl).toBeDefined();
    expect(nameControl.valid).toBeFalsy();

    const photoControl = form.controls['photo'];
    photoControl.setValue(value);
    expect(photoControl).toBeDefined();
    expect(photoControl.valid).toBeFalsy();

    const nationalityControl = form.controls['nationality'];
    nationalityControl.setValue(value);
    expect(nationalityControl).toBeDefined();
    expect(nationalityControl.valid).toBeFalsy();

    const biographyControl = form.controls['biography'];
    biographyControl.setValue(value);
    expect(biographyControl).toBeDefined();
    expect(biographyControl.valid).toBeFalsy();

  });
  it('test valid fields values', () => {
    const form = component.actorForm;

    let value = faker.lorem.word();

    const nameControl = form.controls['name'];
    nameControl.setValue(value);
    expect(nameControl).toBeDefined();
    expect(nameControl.valid).toBeTruthy();

    const nationalityControl = form.controls['nationality'];
    nationalityControl.setValue(value);
    expect(nationalityControl).toBeDefined();
    expect(nationalityControl.valid).toBeTruthy();

    const biographyControl = form.controls['biography'];
    biographyControl.setValue(value);
    expect(biographyControl).toBeDefined();
    expect(biographyControl.valid).toBeTruthy();

  });
  it('test create actor', () => {
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
   spyOn(service, 'createActor').and.returnValue(of(actor));

    expect(() => {
      component.createActor(actor);
    }).not.toThrow();
  });
  it('test error create actor', () => {
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
   const error = 'Error message';

   spyOn(service, 'createActor').and.returnValue(throwError(() => error));

    expect(() => {
      component.createActor(actor);
    }).not.toThrow();
  });
  it('close pop up', () => {
    expect(() => {
      component.closePopup();
    }).not.toThrow();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
