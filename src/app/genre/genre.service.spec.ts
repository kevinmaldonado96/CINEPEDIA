/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenreService } from './genre.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Genre', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenreService]
    });
  });

  it('should ...', inject([GenreService], (service: GenreService) => {
    expect(service).toBeTruthy();
  }));
});
