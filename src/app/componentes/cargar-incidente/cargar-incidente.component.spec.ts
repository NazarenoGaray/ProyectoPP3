import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarIncidenteComponent } from './cargar-incidente.component';

describe('CargarIncidenteComponent', () => {
  let component: CargarIncidenteComponent;
  let fixture: ComponentFixture<CargarIncidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarIncidenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
