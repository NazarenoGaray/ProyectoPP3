import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { estado_usuarios } from 'src/app/model/estado_usuarios.model';
import { Rol } from 'src/app/model/roles.model';
import { Usuario } from 'src/app/model/usuario.model';
import { EstadoUsuariosService } from 'src/app/servicios/usuarios/estado-usuarios.service';
import { RolService } from 'src/app/servicios/usuarios/roles.service';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  rol!: Rol;
  estados: estado_usuarios[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private rolesService: RolService,
    private estadoUsuarios: EstadoUsuariosService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (response) => {
        this.usuarios = Object.values(response);
        console.log("usuario obtenido:",this.usuarios);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
  detallesUsuario(idUsuario: number) {
    this.router.navigate(['/usuario',idUsuario]);
  }
}
