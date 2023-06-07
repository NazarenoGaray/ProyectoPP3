import { TestBed } from '@angular/core/testing';
import { EstadoUsuariosService } from './estado-usuarios.service';

describe('EstadoUsuariosService', () => {
  let service: EstadoUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
