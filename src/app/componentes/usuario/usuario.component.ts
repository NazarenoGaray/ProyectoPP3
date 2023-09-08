import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario!: Usuario;

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idUsuario = params.get('idUsuario');
      if (idUsuario) {
        this.obtenerUsuarioPorId(Number(idUsuario));
      } else {
        console.log("***** NO SE ENCONTRÓ EL USUARIO *****");
      }
    });
  }

  obtenerUsuarioPorId(idUsuario: number) {
    this.usuariosService.obtenerUsuarioPorId(idUsuario).subscribe(
      (data: Usuario) => {
        if (data && data.localidad && data.provincia && data.pais) {
          this.usuario = data;
          console.log('Datos del usuario:', data);
        } else {
          console.log('Datos del usuario incompletos:', data);
        }
      },
      (error: any) => {
        console.log('Error al obtener los detalles del usuario:', error);
      }
    );
  }

}
