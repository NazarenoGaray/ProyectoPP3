import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAltaEstablecimientoComponent } from './confirm-alta-establecimiento.component';

describe('ConfirmAltaEstablecimientoComponent', () => {
  let component: ConfirmAltaEstablecimientoComponent;
  let fixture: ComponentFixture<ConfirmAltaEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAltaEstablecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAltaEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
