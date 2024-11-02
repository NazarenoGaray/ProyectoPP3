import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPuestoComponent } from './alta-puesto.component';

describe('AltaPuestoComponent', () => {
  let component: AltaPuestoComponent;
  let fixture: ComponentFixture<AltaPuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaPuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
