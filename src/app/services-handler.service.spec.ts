import { TestBed } from '@angular/core/testing';

import { ServicesHandlerService } from './services-handler.service';

describe('ServicesHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesHandlerService = TestBed.get(ServicesHandlerService);
    expect(service).toBeTruthy();
  });
});
