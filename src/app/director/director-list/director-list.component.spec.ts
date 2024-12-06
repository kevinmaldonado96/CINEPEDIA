/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { DirectorListComponent } from './director-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DirectorService } from '../director.service';
import { Director } from '../director';
import { faker } from '@faker-js/faker';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DirectorDetails } from '../director-details';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('DirectorListComponent', () => {
  let component: DirectorListComponent;
  let fixture: ComponentFixture<DirectorListComponent>;
  let debug: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxLoadingModule, FormsModule, RouterTestingModule],
      declarations: [DirectorListComponent],
      providers: [DirectorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorListComponent);
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
    debug = fixture.debugElement;
  });

  it('should create-platform', () => {
    expect(component).toBeTruthy();
  });

  it('should have 10 <div.card> elements', () => {
    expect(debug.queryAll(By.css('div.card'))).toHaveSize(10);
  });

  it('should have 10 <img> elements', () => {
    expect(debug.queryAll(By.css('img'))).toHaveSize(10);
  });

  it('should have 10 <div.card-body> elements', () => {
    expect(debug.queryAll(By.css('div.card-body'))).toHaveSize(10);
  });

  it('should have the corresponding src to the director`s photo', () => {
    debug.queryAll(By.css('img')).forEach((img, i) => {
      expect(img.attributes['src']).toEqual(
        component.directorsFiltered[i].photo
      );
    });
  });

  it('should have blockquote tag with the directors.name', () => {
    debug.queryAll(By.css('h4.pb-1.fw-bold')).forEach((h4, i) => {
      expect(h4.nativeElement.textContent).toContain(
        component.directorsFiltered[i].name
      );
    });
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

  it('should redirect to ', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    component.showDetail('testId');
    const url = navigateSpy.calls.first().args[0];
    expect(url).toEqual(['director/testId']);
  });
});
