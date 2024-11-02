import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPuestoComponent } from './editar-puesto.component';

describe('EditarPuestoComponent', () => {
  let component: EditarPuestoComponent;
  let fixture: ComponentFixture<EditarPuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
