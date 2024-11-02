import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstablecimientosComponent } from './editar-establecimientos.component';

describe('EditarEstablecimientosComponent', () => {
  let component: EditarEstablecimientosComponent;
  let fixture: ComponentFixture<EditarEstablecimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstablecimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
