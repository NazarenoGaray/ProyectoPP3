import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarIncidenteComponent } from './modificar-incidente.component';

describe('ModificarIncidenteComponent', () => {
  let component: ModificarIncidenteComponent;
  let fixture: ComponentFixture<ModificarIncidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarIncidenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
