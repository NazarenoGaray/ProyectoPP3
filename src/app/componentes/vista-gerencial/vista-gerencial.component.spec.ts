import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGerencialComponent } from './vista-gerencial.component';

describe('VistaGerencialComponent', () => {
  let component: VistaGerencialComponent;
  let fixture: ComponentFixture<VistaGerencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaGerencialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaGerencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
