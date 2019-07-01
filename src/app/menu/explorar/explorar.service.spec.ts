import { TestBed } from '@angular/core/testing';

import { ExplorarService } from './explorar.service';

describe('ExplorarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExplorarService = TestBed.get(ExplorarService);
    expect(service).toBeTruthy();
  });
});
