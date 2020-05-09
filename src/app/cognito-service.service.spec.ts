import { TestBed } from '@angular/core/testing';

import { CognitoServiceService } from './cognito-service.service';

describe('CognitoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CognitoServiceService = TestBed.get(CognitoServiceService);
    expect(service).toBeTruthy();
  });
});
