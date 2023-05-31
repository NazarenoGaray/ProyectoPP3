import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../servicios/usuario.model';
import { UsuarioService } from '../../../app/servicios/usuario.service';
import { switchMap, take } from 'rxjs/operators';
import { Rol } from '../../servicios/roles.model';
import { RolService } from '../../servicios/roles.service';
import { UbicacionService } from 'src/app/servicios/ubicacion.service';
import { EstadoUsuariosService } from 'src/app/servicios/estado-usuarios.service';
import { estado_usuarios } from '../model/estado_usuarios.model';


@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  usuarioForm!: FormGroup;
  usuario!: Usuario;
  id_usuario!: number;
  roles: Rol[] = [];
  estados: estado_usuarios[] = [];
  paises: any[] = [];
  provincias: any[] = [];
  localidades: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
    private ubicacionService: UbicacionService,
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, this.validateCorreo]],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      id_rol: ['', Validators.required],
      pais: [{ value: '', disabled: false }, Validators.required],
      provincia: [{ value: '', disabled: true }, Validators.required],
      localidad: [{ value: '', disabled: true }, Validators.required],
      id_estado_usuario: ['', Validators.required]
    });
    // Obtenemos los roles para cargarlos en el select
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
        this.estados = res;
      },
      (err: any) => {
        console.log(`Error al obtener los estados: ${err.message}`);
      }
    );
    ////////////////////////////////////////////////////////
    this.ubicacionService.getPaises().subscribe((data: any[]) => {
      this.paises = data;
    });
    ////////////////////////////////////////////////////////
    this.route.params.pipe(
      take(1),
      switchMap(params => this.usuarioService.obtenerUsuarioPorId(params['id']))
    ).subscribe(
      (usuario: Usuario | null) => {
        if (usuario) {
          console.log("Data obtenida: ", usuario);
          this.usuarioForm.patchValue(usuario);
          this.id_usuario = usuario.id_usuario;
          this.usuario = usuario;
        } else {
          console.log("Usuario no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );

  }
  validateCorreo(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length < 5) {
      return { 'correoInvalido': true };
    }
    return null;
  }
  actualizarUsuario() {
    const usuarioFormulario = this.usuarioForm.value;
    this.usuario = {
      ...usuarioFormulario,
      id_usuario: this.id_usuario
    };
    this.usuarioService.actualizarUsuario(this.id_usuario, this.usuario).subscribe(
      (res: any) => {
        console.log(`Usuario con ID ${this.id_usuario} actualizado`);
        this.router.navigate(['/listar-usuarios']);
      },
      (err: any) => {
        console.log(`Error al actualizar usuario: ${err.message}`);
      }
    );
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  onPaisSelected() {
    const paisId = this.usuarioForm.value.pais;
    this.usuarioForm.get('provincia')?.setValue('');
    this.usuarioForm.get('provincia')?.disable();
    this.usuarioForm.get('localidad')?.setValue('');
    this.usuarioForm.get('localidad')?.disable();
    this.provincias = [];

    if (paisId) {
      this.ubicacionService.getProvincias(paisId).subscribe((data: any[]) => {
        this.provincias = data;
        this.usuarioForm.get('provincia')?.enable();
      });
    }
  }

  onProvinciaSelected() {
    const provinciaId = this.usuarioForm.value.provincia;
    this.usuarioForm.get('localidad')?.setValue('');
    this.usuarioForm.get('localidad')?.disable();
    this.localidades = [];

    if (provinciaId) {
      this.ubicacionService.getLocalidades(provinciaId).subscribe((data: any[]) => {
        this.localidades = data;
        this.usuarioForm.get('localidad')?.enable();
      });
    }
  }
}
