/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { DirectorDetailComponent } from './director-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxLoadingModule } from 'ngx-loading';
import { DirectorDetails } from '../director-details';
import { DirectorService } from '../director.service';
import { of, throwError } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import Swal from 'sweetalert2';

describe('DirectorDetailComponent', () => {
  let component: DirectorDetailComponent;
  let fixture: ComponentFixture<DirectorDetailComponent>;
  let httpTestingController: HttpTestingController;
  let debug: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxLoadingModule,
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [DirectorDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-platform', () => {
    expect(component).toBeTruthy();
  });

  it('test_get_director_successfully_retrieves_director_details', () => {
    let service: DirectorService;
    const directorDetails = new DirectorDetails(
      '1',
      'Test Director',
      'test.jpg',
      'Test Nationality',
      new Date(),
      'Test Biography',
      []
    );
    service = TestBed.inject(DirectorService);
    spyOn(service, 'getDirectorDetail').and.returnValue(of(directorDetails));
    component.getDirector('1');
    expect(component.director).toBeDefined();
    expect(component.director?.name).toBe('Test Director');
  });

  it('test_get_director_with_empty_director_id_parameter', () => {
    component.getDirector('');
    expect(component.director).toBeUndefined();
  });

  it('test_get_director_from_filters', () => {
    let service: DirectorService;
    const directorDetails = new DirectorDetails(
      '1',
      'Test Director',
      'test.jpg',
      'Test Nationality',
      new Date(),
      'Test Biography',
      []
    );
    service = TestBed.inject(DirectorService);
    spyOn(service, 'getDirectorDetail').and.returnValue(of(directorDetails));
    component.getDirectorFromFilters('1');
    expect(component.director).toBeDefined();
    expect(component.director?.name).toBe('Test Director');
  });

  // Test funcion on init when route parameter is null
  it('test_routeDirector_null', () => {
    component.ngOnInit();
    expect(component.routeDirectorId).toBe(null);
  });

  it('test_popUp_show', () => {
    component = fixture.componentInstance;
    spyOn(Swal, 'fire');
    component.showPopUpError();
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('test_error_getDirector', () => {
    const directorService = TestBed.inject(DirectorService);
    spyOn(directorService, 'getDirectorDetail').and.returnValue(
      throwError(() => new Error('Error en la petición HTTP'))
    );
    component.getDirector('123');
    expect(component.loading).toBe(false);
    expect(component.director).toBeUndefined();
  });
});
