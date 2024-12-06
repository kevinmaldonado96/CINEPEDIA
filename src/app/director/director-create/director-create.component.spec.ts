/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorCreateComponent } from './director-create.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DirectorService } from '../director.service';
import { DirectorCreate } from '../directorCreate';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { faker } from '@faker-js/faker';

describe('DirectorCreateComponent', () => {
  let component: DirectorCreateComponent;
  let fixture: ComponentFixture<DirectorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [DirectorCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test_create_director_reset_form', () => {
    component.directorForm.setValue({
      name: 'Test Director',
      photo: 'https://test.com/test.jpg',
      nationality: 'Test Nationality',
      birthDate: '1990-01-01',
      biography: 'Test Biography',
    });
    component.closeModal();
    expect(component.directorForm.value).toEqual({
      name: null,
      photo: null,
      nationality: null,
      birthDate: null,
      biography: null,
    });
  });

  it('test empty values ​​on the form', () => {
    const form = component.directorForm;
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

  it('test_create_director', () => {
    let service: DirectorService;
    let actor = new DirectorCreate(
      'test name',
      'test.jpg',
      faker.random.word(),
      faker.date.between('1990-01-01', '2023-04-22'),
      faker.lorem.paragraph()
    );
    service = TestBed.inject(DirectorService);
    spyOn(service, 'postDirector').and.returnValue(of(actor));

    expect(() => {
      component.createDirector(actor);
    }).not.toThrow();
  });
});
