import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTecnicoComponent } from './vista-tecnico.component';

describe('VistaTecnicoComponent', () => {
  let component: VistaTecnicoComponent;
  let fixture: ComponentFixture<VistaTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaTecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
