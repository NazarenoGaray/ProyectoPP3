import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEstablecimientosComponent } from './alta-establecimientos.component';

describe('AltaEstablecimientosComponent', () => {
  let component: AltaEstablecimientosComponent;
  let fixture: ComponentFixture<AltaEstablecimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEstablecimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
