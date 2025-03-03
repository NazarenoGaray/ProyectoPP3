import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../model/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { TokenService } from 'src/app/servicios/token/token.service';
import { LoadingService } from 'src/app/servicios/loading.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario!: Usuario;
  usuarioLogueado!: Usuario;

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuarioService,
    private tokenService: TokenService, 
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.usuarioLogueado = this.tokenService.getAuthenticatedUser();
    //console.log('Usuario logueado (mod usuario.component.ts):', this.usuarioLogueado.rol.idRol);

    this.route.paramMap.subscribe((params) => {
      const idUsuario = params.get('idUsuario');
      if (idUsuario) {
        this.obtenerUsuarioPorId(Number(idUsuario));
        this.loadingService.hide();
      } else {
        this.loadingService.hide();
        console.log("***** NO SE ENCONTRÓ EL USUARIO *****");
      }
    });
  }

  obtenerUsuarioPorId(idUsuario: number) {
    this.usuariosService.obtenerUsuarioPorId(idUsuario).subscribe(
      (data: any) => {
        if (data && data.localidad && data.provincia && data.pais) {
          this.usuario = data;
          //console.log('Datos del usuario:', data);
        } else {
          console.log('Datos del usuario incompletos:', data);
        }
      },
      (error: any) => {
        console.log('Error al obtener los detalles del usuario:', error);
      }
    );
  }
  getEstado(){
    return this.loadingService.getEstado();
  } 
}
