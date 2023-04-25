import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstablecimientosComponent } from './listar-establecimientos.component';

describe('ListarEstablecimientosComponent', () => {
  let component: ListarEstablecimientosComponent;
  let fixture: ComponentFixture<ListarEstablecimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEstablecimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
