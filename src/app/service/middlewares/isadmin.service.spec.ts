import { TestBed } from '@angular/core/testing';

import { IsadminService } from './isadmin.service';

describe('IsadminService', () => {
  let service: IsadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
