import { TestBed } from '@angular/core/testing';

import { EstadoIncidenteService } from './estadoIncidente.service';

describe('EstadoService', () => {
  let service: EstadoIncidenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoIncidenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
