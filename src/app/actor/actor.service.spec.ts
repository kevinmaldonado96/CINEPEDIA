import { TestBed } from '@angular/core/testing';

import { ActorService } from './actor.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ActorService', () => {
  let service: ActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule]
    });
    service = TestBed.inject(ActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
