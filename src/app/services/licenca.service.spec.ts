import { TestBed } from '@angular/core/testing';

import { LicencaService } from './licenca.service';

describe('LicencaService', () => {
  let service: LicencaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicencaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
