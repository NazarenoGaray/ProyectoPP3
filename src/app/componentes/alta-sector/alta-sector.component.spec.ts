import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaSectorComponent } from './alta-sector.component';

describe('AltaSectorComponent', () => {
  let component: AltaSectorComponent;
  let fixture: ComponentFixture<AltaSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
