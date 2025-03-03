import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCargarIncidenteComponent } from './confirm-cargar-incidente.component';

describe('ConfirmCargarIncidenteComponent', () => {
  let component: ConfirmCargarIncidenteComponent;
  let fixture: ComponentFixture<ConfirmCargarIncidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCargarIncidenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCargarIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
