/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { DirectorDetailsFilterComponent } from './director-details-filter.component';
import { Director } from '../director';
import { DirectorService } from '../director.service';
import {  HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { DirectorDetails } from '../director-details';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('DirectorDetailsFilterComponent', () => {
  let component: DirectorDetailsFilterComponent;
  let fixture: ComponentFixture<DirectorDetailsFilterComponent>;
  let debug: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgxLoadingModule,
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [DirectorDetailsFilterComponent],
      providers: [DirectorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorDetailsFilterComponent);
    component = fixture.componentInstance;
    for (let i = 0; i < 10; i++) {
      let director = new Director(
        faker.random.word(),
        faker.name.firstName(),
        faker.image.imageUrl(),
        faker.name.jobArea(),
        parseInt(faker.random.numeric())
      );
      component.directors.push(director);
      component.directorsFiltered.push(director);
      component.itemsPerPage = 10;
      component.getTotalPages();
    }
    fixture.detectChanges();
  });

  it('should create-platform', () => {
    expect(component).toBeTruthy();
  });

  it('test_get_directors_list_success', () => {
    let service: DirectorService;
    let directors = [];
    for (let i = 0; i < 2; i++) {
      let director = new DirectorDetails(
        faker.random.word(),
        faker.name.firstName(),
        faker.image.imageUrl(),
        faker.name.jobArea(),
        new Date(),
        faker.lorem.text(),
        []
      );
      directors.push(director);
    }
    service = TestBed.inject(DirectorService);
    spyOn(service, 'getDirectors').and.returnValue(of(directors));
    component.getDirectorsList();
    expect(component.directors.length).toBe(2);
    expect(component.directorsFiltered.length).toBe(2);
    expect(component.totalPages).toBe(1);
  });

  it('should search director by name', () => {
    component.search(component.directorsFiltered[0].name);
    fixture.detectChanges();
    expect(component.directorsFiltered.length).toBe(1);
  });

  it('should sort director by name', () => {
    component.search(component.directorsFiltered[0].name);
    let sortedNames = component.directorsFiltered
      .map((director) => director.name)
      .sort();
    component.sortByName();
    fixture.detectChanges();
    expect(component.directorsFiltered[0].name).toEqual(sortedNames[0]);
  });

  it('should sort director by nationality', () => {
    component.search(component.directorsFiltered[0].name);
    let sortedContries = component.directorsFiltered
      .map((director) => director.nationality)
      .sort();
    component.sortByContry();
    fixture.detectChanges();
    expect(component.directorsFiltered[0].nationality).toEqual(
      sortedContries[0]
    );
  });

  it('should get_directors_list_success', () => {
    let service: DirectorService;
    let directors = [];
    for (let i = 0; i < 2; i++) {
      let director = new DirectorDetails(
        faker.random.word(),
        faker.name.firstName(),
        faker.image.imageUrl(),
        faker.name.jobArea(),
        new Date(),
        faker.lorem.text(),
        []
      );
      directors.push(director);
    }
    service = TestBed.inject(DirectorService);
    spyOn(service, 'getDirectors').and.returnValue(of(directors));
    component.getDirectorsList();
    expect(component.directors.length).toBe(2);
    expect(component.directorsFiltered.length).toBe(2);
    expect(component.totalPages).toBe(1);
  });

  it('test_num_page_buttons_greater_than_total_pages', () => {
    component.totalPages = 3;
    component.numPageButtons = 5;
    const pageNumbers = component.getPageNumbers();
    expect(pageNumbers.length).toBe(3);
    expect(pageNumbers[0]).toBe(1);
    expect(pageNumbers[1]).toBe(2);
    expect(pageNumbers[2]).toBe(3);
  });

  it('should sort items asc', () => {
    component.search(component.directorsFiltered[0].name);
    let sortedContries = component.directorsFiltered
      .map((director) => director.nationality)
      .sort();
    component.sortItems(component.directorsFiltered, true, 'nationality');
    fixture.detectChanges();
    expect(component.directorsFiltered[0].nationality).toEqual(
      sortedContries[0]
    );
  });

  it('should sort items asc', () => {
    let sortedContries = component.directorsFiltered
      .map((director) => director.nationality)
      .sort();
    component.directorsFiltered = component.sortItems(
      component.directorsFiltered,
      true,
      'nationality'
    );
    fixture.detectChanges();
    expect(component.directorsFiltered[0].nationality).toEqual(
      sortedContries[0]
    );
  });

  it('should sort items desc', () => {
    let sortedContries = component.directorsFiltered
      .map((director) => director.nationality)
      .sort()
      .reverse();
    component.directorsFiltered = component.sortItems(
      component.directorsFiltered,
      false,
      'nationality'
    );
    fixture.detectChanges();
    expect(component.getIcon(false)).toEqual('fas fa-arrow-up');
    expect(component.directorsFiltered[0].nationality).toEqual(
      sortedContries[0]
    );
  });

  it('should set id director', () => {
    component.selectDirector('testId');
    expect(component.directorId).toEqual('testId');
  });
});
