import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSectorComponent } from './editar-sector.component';

describe('EditarSectorComponent', () => {
  let component: EditarSectorComponent;
  let fixture: ComponentFixture<EditarSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
