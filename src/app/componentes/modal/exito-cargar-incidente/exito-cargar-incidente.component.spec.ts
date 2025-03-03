import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitoCargarIncidenteComponent } from './exito-cargar-incidente.component';

describe('ExitoCargarIncidenteComponent', () => {
  let component: ExitoCargarIncidenteComponent;
  let fixture: ComponentFixture<ExitoCargarIncidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitoCargarIncidenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitoCargarIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
