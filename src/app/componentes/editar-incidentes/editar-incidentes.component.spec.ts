import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIncidentesComponent } from './editar-incidentes.component';

describe('EditarIncidentesComponent', () => {
  let component: EditarIncidentesComponent;
  let fixture: ComponentFixture<EditarIncidentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarIncidentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarIncidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
