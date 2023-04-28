  import { Component } from '@angular/core';
  import { UsuariosService } from './servicios/usuarios.service';

  @Component({
    selector: 'app-root',
    template: `
      <h2>Listado de usuarios</h2>
      <ul>
        <li *ngFor="let usuario of usuarios">{{usuario.nombre}} {{usuario.apellido}}</li>
      </ul>
    `,
  })
  export class AppComponent {
    usuarios: any[] = [];

    constructor(private usuariosService: UsuariosService) {}

    ngOnInit(): void {
      this.usuariosService.listarUsuarios().subscribe(data => {
        this.usuarios = data;
      });
    }
  }
