import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { CardMovieComponent } from './card-movie.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Movie} from "../movie";

describe('CardMovieComponent', () => {
  let component: CardMovieComponent;
  let fixture: ComponentFixture<CardMovieComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMovieComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMovieComponent);
    component = fixture.componentInstance;

    component.movie.releaseDate = faker.date.birthdate().toLocaleString();
    component.movie.title = faker.lorem.words(50);
    component.movie.popularity = Math.floor(Math.random() * 6);
    component.movie.duration = Math.floor(Math.random() * (5 - 1 ) + 1);
    component.movie.poster = faker.image.imageUrl();
    fixture.detectChanges();
    debug = fixture.debugElement;
  });


  it('should create-platform', () => {
    expect(component).toBeTruthy();
  });

  it('should have a poster image url and alt name', () => {
    let img = debug.query(By.css('img'));
    expect(img.attributes['src']).toEqual(component.movie.poster!!);
    expect(img.attributes['alt']).toEqual(component.movie.title!!);
  });

  it('should have a title', () => {
    let title = debug.query(By.css('span.card-text'));
    expect(title.nativeElement.textContent).toEqual(component.movie.title);
  });

  it('should have a duration and year with specific format', () => {
    let title = debug.queryAll(By.css('span.card-text'));
    let format = ' ' + component.movie.releaseDate!!.substring(0, 4) + ' | '  + component.movie.duration + ' h ';
    expect(title[1].nativeElement.textContent).toEqual(format);
  });

  it('should have a stars', () => {
    expect(debug.queryAll(By.css('i.bi-star-fill'))).toHaveSize(component.movie.popularity!!);
    expect(debug.queryAll(By.css('i.bi-star'))).toHaveSize(5 - component.movie.popularity!!);
  });

  it('should create-platform range', () => {
    expect(component.createRange(3)).toEqual([1,2,3]);
  });

  it('shold back button redirect to movies', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    let id = faker.datatype.uuid();
    component.showDetail(id);
    expect(spy.calls.first().args[0]).toContain('movie/' + id);
  }));

  it('should emit open actor modal',  () => {
    spyOn(component.parentOpenActorModal, 'emit');
    component.openActorModal(new Movie());
    expect(component.parentOpenActorModal.emit).toHaveBeenCalled();
  });

  it('should emit open platform modal',  () => {
    spyOn(component.parentOpenPlatformModal, 'emit');
    component.openPlatformModal(new Movie());
    expect(component.parentOpenPlatformModal.emit).toHaveBeenCalled();
  });
});
