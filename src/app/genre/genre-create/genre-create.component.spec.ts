/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenreCreateComponent } from './genre-create.component';
import { GenreService } from '../genre.service';
import { Genre } from '../genre';
import { of } from 'rxjs';
import { GenreList } from '../genreList';
import { faker } from '@faker-js/faker';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('GenreCreateComponent', () => {
  let component: GenreCreateComponent;
  let fixture: ComponentFixture<GenreCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [GenreCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test_create_genre', () => {
    let service: GenreService;
    let genre = new Genre(
      'test name',
    );
    service = TestBed.inject(GenreService);
    spyOn(service, 'postGenre').and.returnValue(of(genre));

    expect(() => {
      component.createGenre(genre);
    }).not.toThrow();
  });

  it('should get_genres_list_success', () => {
    let service: GenreService;
    let genres = [];
    for (let i = 0; i < 2; i++) {
      let genre = new GenreList(
        faker.random.word(),
        faker.name.firstName(),
        []
      );
      genres.push(genre);
    }
    service = TestBed.inject(GenreService);
    spyOn(service, 'getGenres').and.returnValue(of(genres));
    component.getGenres();
    expect(component.genres.length).toBe(2);
  });

  it('test_create_genre_reset_form', () => {
    component.genreForm.setValue({
      type: 'Test',
    });
    component.closeModal();
    expect(component.genreForm.value).toEqual({
      type: null,
    });
  });
});
