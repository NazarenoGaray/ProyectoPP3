import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { estado_usuarios } from 'src/app/model/estado_usuarios.model';
import { Rol } from 'src/app/model/roles.model';
import { EstadoUsuariosService } from 'src/app/servicios/usuarios/estado-usuarios.service';
import { RolService } from 'src/app/servicios/usuarios/roles.service';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';


@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  usuario: any = {};
  idUsuario = sessionStorage.getItem('ID_USUARIO');
  cambioClaveForm: FormGroup;
  hideActual = true;
  hideNueva = true;
  hideConfirmar = true;
  cambiandoClave = false;
  mensajeError = '';
  mensajeExito = '';
  private readonly ID_USUARIO = 'ID_USUARIO';
  roles: Rol[] = [];
  estados!: estado_usuarios[];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
    private router: Router
  ) {
    this.cambioClaveForm = this.fb.group({
      claveActual: ['', Validators.required],
      nuevaClave: ['', [Validators.required, Validators.minLength(8)]],
      confirmarClave: ['', Validators.required]
    }, { validator: this.confirmarClaveValidator });
  }

  ngOnInit(): void {
    this.cargarDatosUsuario();
    this.rolService.obtenerRoles().subscribe(
          (res: Rol[]) => {
            this.roles = res;
          },
          (err: any) => {
            console.log(`Error al obtener los roles: ${err.message}`);
          }
        );
        ///////////////////////////////////////////////
        this.estadoService.obtenerEstadosUsuarios().subscribe(
          (res: estado_usuarios[]) => {
          console.log(`roles obtenidos: `,this.estados);
          this.estados = res;
        },
          (err: any) => {
            console.log(`Error al obtener los estados del usuario: ${err.message}`);
          }
        );
  }

  cargarDatosUsuario(): void {
    if(this.idUsuario){
      this.usuarioService.obtenerUsuarioPorId(parseInt(this.idUsuario)).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (err) => {
          console.error('Error al cargar usuario:', err);
        }
      });
    }else{console.log('no se encontro el id de usuario logueado');}
  }
  confirmarClaveValidator(form: FormGroup): { [key: string]: boolean } | null {
    const nuevaClave = form.get('nuevaClave')?.value;
    const confirmarClave = form.get('confirmarClave')?.value;

    return nuevaClave === confirmarClave ? null : { noCoinciden: true };
  }

  cambiarClave(): void {
    if (this.cambioClaveForm.invalid) {
      return;
    }

    this.cambiandoClave = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const { claveActual, nuevaClave } = this.cambioClaveForm.value;
    if(this.idUsuario){
      this.usuarioService.cambiarClave(parseInt(this.idUsuario), claveActual, nuevaClave).subscribe({
        next: (response) => {
          this.mensajeExito = 'Contraseña cambiada exitosamente';
          this.cambioClaveForm.reset();

          // Si el estado era "nuevo" (5), actualizar el estado en el frontend
          if (this.usuario.estado === 'nuevo') {
            this.usuario.estado = 'activo';
            sessionStorage.setItem('ESTADO_USUARIO', 'activo');
          }

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error al cambiar contraseña:', err);
          this.mensajeError = err.error?.message || 'Error al cambiar la contraseña';
          if (err.status === 401) {
            this.mensajeError = 'La contraseña actual es incorrecta';
          }
        },
        complete: () => {
          this.cambiandoClave = false;
        }
      });
    }
  }

  // Agrega estos métodos para obtener las descripciones
getDescripcionRol(idRol: number): string {
  const rol = this.roles.find(r => r.idRol === idRol);
  return rol ? rol.nombre : 'Desconocido';
}

getDescripcionEstado(idEstado: number): string {
  const estado = this.estados.find(e => e.idEstadoUsuario === idEstado);
  return estado ? estado.descripcion : 'Desconocido';
}

getEstadoClase(idEstado: number): string {
  const estado = this.estados.find(e => e.idEstadoUsuario === idEstado);
  if (!estado) return 'badge bg-secondary';
  
  switch (estado.descripcion.toLowerCase()) {
    case 'nuevo': return 'badge bg-warning';
    case 'activo': return 'badge bg-success';
    case 'inactivo': return 'badge bg-danger';
    default: return 'badge bg-secondary';
  }
}
}
