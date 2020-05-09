import { TestBed } from '@angular/core/testing';

import { AwsApiConnectService } from './aws-api-connect.service';

describe('AwsApiConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsApiConnectService = TestBed.get(AwsApiConnectService);
    expect(service).toBeTruthy();
  });
});
