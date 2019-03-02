import { TestBed, inject } from '@angular/core/testing';

import { VultrService } from './vultr.service';

describe('VultrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VultrService]
    });
  });

  it('should be created', inject([VultrService], (service: VultrService) => {
    expect(service).toBeTruthy();
  }));
});
