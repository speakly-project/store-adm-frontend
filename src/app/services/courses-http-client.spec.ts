import { TestBed } from '@angular/core/testing';

import { CoursesHttpClient } from './courses-http-client';

describe('CoursesHttpClient', () => {
  let service: CoursesHttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
