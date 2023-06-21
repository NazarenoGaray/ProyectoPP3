import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { RolService } from 'src/app/servicios/usuarios/roles.service';
import { EstadoUsuariosService } from 'src/app/servicios/usuarios/estado-usuarios.service';
import { switchMap, take } from 'rxjs';

import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import { estado_usuarios } from 'src/app/model/estado_usuarios.model';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  idUsuario!: number;
  usuario!: Usuario;
  detalles:boolean=true;
  estado!:estado_usuarios;
  
  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuarioService,
  ) { }


  ngOnInit() {
    this.route.params.pipe(
      take(1),
      switchMap(params => this.usuariosService.obtenerDetallesUsuarioPorId(params['id']))
    ).subscribe(
      (usuario: Usuario | null) => {
        if (usuario) {
          console.log("Data obtenida: ", usuario);
          this.idUsuario = usuario.idUsuario;
          this.usuario = usuario;
          console.log("Usuario obtenida: ", this.usuario);
          // this.usuario.IDPais = usuario.IDPais;
          // this.usuario.IDProvincia = usuario.IDProvincia;
          // this.usuario.IDLocalidad = usuario.IDLocalidad;
        } else {
          console.log("Usuario no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
