import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAltaUsuarioComponent } from './confirm-alta-usuario.component';

describe('ConfirmAltaUsuarioComponent', () => {
  let component: ConfirmAltaUsuarioComponent;
  let fixture: ComponentFixture<ConfirmAltaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAltaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAltaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
