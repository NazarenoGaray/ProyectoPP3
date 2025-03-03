import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitoAltaEstablecimientoComponent } from './exito-alta-establecimiento.component';

describe('ExitoAltaEstablecimientoComponent', () => {
  let component: ExitoAltaEstablecimientoComponent;
  let fixture: ComponentFixture<ExitoAltaEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitoAltaEstablecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitoAltaEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
