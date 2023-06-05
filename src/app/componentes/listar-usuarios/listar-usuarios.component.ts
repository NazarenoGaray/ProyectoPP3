import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { EstadoUsuariosService } from 'src/app/servicios/usuarios/estado-usuarios.service';
import { RolService } from 'src/app/servicios/usuarios/roles.service';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: any[] = [];
  roles: any[] = [];
  estados: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private rolesService: RolService,
    private estadoUsuarios: EstadoUsuariosService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles();
    this.obtenerEstados();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (response) => {
        this.usuarios = Object.values(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerRoles() {
    this.rolesService.obtenerRoles().subscribe(
      (roles: any[]) => {
        this.roles = roles;
      },
      (error) => {
        console.log('Error al obtener roles:', error);
      }
    );
  }

  obtenerEstados() {
    this.estadoUsuarios.obtenerEstadosUsuarios().subscribe(
      (estados: any[]) => {
        this.estados = estados;
      },
      (error) => {
        console.log('Error al obtener estados:', error);
      }
    );
  }

  obtenerNombreRol(idRol: number): string {
    const rol = this.roles.find((rol) => rol.id_rol === idRol);
    return rol ? rol.rol : '';
  }
  
  obtenerNombreEstado(idEstado: number): string {
    const estado = this.estados.find((estado) => estado.id_estado_usuario === idEstado);
    return estado ? estado.estado : '';
  }

  detallesUsuario(id_usuario: number) {
    this.router.navigate(['/usuario',id_usuario]);
    // console.log(`Eliminar usuario con ID ${id_usuario}`);
    // if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
    //   this.usuarioService.eliminarUsuario(id_usuario).subscribe(() => {
    //     console.log(`Usuario con ID ${id_usuario} eliminado`);
    //     this.obtenerUsuarios();
    //   });
    // }
  }
}
