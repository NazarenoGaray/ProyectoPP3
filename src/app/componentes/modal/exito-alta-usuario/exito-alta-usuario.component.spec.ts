import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitoAltaUsuarioComponent } from './exito-alta-usuario.component';

describe('ExitoAltaUsuarioComponent', () => {
  let component: ExitoAltaUsuarioComponent;
  let fixture: ComponentFixture<ExitoAltaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitoAltaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitoAltaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
