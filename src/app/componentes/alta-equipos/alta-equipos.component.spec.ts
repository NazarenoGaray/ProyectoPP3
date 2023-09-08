import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEquiposComponent } from './alta-equipos.component';

describe('AltaEquiposComponent', () => {
  let component: AltaEquiposComponent;
  let fixture: ComponentFixture<AltaEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEquiposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
