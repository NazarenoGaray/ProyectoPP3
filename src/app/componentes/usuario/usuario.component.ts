import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { RolService } from 'src/app/servicios/usuarios/roles.service';
import { EstadoUsuariosService } from 'src/app/servicios/usuarios/estado-usuarios.service';
import { switchMap, take } from 'rxjs';

import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  id_usuario!: number;
  usuario!: any;
  detalles:boolean=true;
  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuarioService,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
    private ubicacionoService: UbicacionService,

  ) { }


  ngOnInit() {
    this.route.params.pipe(
      take(1),
      switchMap(params => this.usuariosService.obtenerDetallesUsuarioPorId(params['id'],this.detalles))
    ).subscribe(
      (usuario: any | null) => {
        if (usuario) {
          console.log("Data obtenida: ", usuario);
          this.id_usuario = usuario.id_usuario;
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
