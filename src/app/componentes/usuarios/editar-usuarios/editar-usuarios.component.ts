import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import { estado_usuarios } from '../../../model/estado_usuarios.model';
import { Pais } from '../../../model/pais.model';
import { Provincia } from '../../../model/provincia.model';
import { Localidad } from '../../../model/localidad.model';
import { Usuario } from '../../../model/usuario.model';
import { Rol } from '../../../model/roles.model';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { RolService } from 'src/app/servicios/usuarios/roles.service';
import { EstadoUsuariosService } from 'src/app/servicios/usuarios/estado-usuarios.service';


@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {
  usuarioForm!: FormGroup;
  usuario!: Usuario;
  usuarioOriginal!: Usuario;
  idUsuario!: number;
  roles: Rol[] = [];
  estados!: estado_usuarios[];
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  hayCambios: boolean = false;

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
      idUsuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, this.validateCorreo]],
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      idRol: ['', Validators.required],
      idPais: [{ value: '', disabled: false }, Validators.required],
      idProvincia: [{ value: '', disabled: false }, Validators.required],
      idLocalidad: [{ value: '', disabled: false }, Validators.required],
      idEstadoUsuario: ['', Validators.required]
    });
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
    ////////////////////////////////////////////////////////
    this.ubicacionService.obtenerPaises().subscribe((data: any[]) => {
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
          this.idUsuario = usuario.idUsuario;
          this.usuario = usuario;
          this.usuarioOriginal = this.usuarioForm.value;
          console.log('formularioActual:', JSON.stringify(this.usuarioForm.value));
          console.log('usuarioOriginal:', JSON.stringify(this.usuarioOriginal));

          // Obtener el país del usuario seleccionado
          if (usuario.idPais) {
            this.usuarioForm.get('idPais')?.setValue(usuario.idPais);
          }
          // Obtener la provincia según el país seleccionado
          if (usuario.idPais) {
            this.ubicacionService.obtenerProvinciaPorId(usuario.idPais).subscribe((provincias: Provincia[]) => {
              this.provincias = provincias;
              this.usuarioForm.get('idProvincia')?.enable();
              this.usuarioForm.get('idProvincia')?.setValue(usuario.idProvincia);
            });
          }

          // Obtener la localidad según la provincia seleccionada
          if (usuario.idProvincia) {
            this.ubicacionService.obtenerLocalidadPorId(usuario.idProvincia).subscribe((localidades: Localidad[]) => {
              this.localidades = localidades;
              this.usuarioForm.get('idLocalidad')?.enable();
              this.usuarioForm.get('idLocalidad')?.setValue(usuario.idLocalidad);
            });
          }
        } else {
          console.log("Usuario no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );

    ////////////////////////////////////////////////////////////////verificando cambios
    this.usuarioForm.valueChanges.subscribe(() => {
      this.detectarCambios();
    });

  }
  validateCorreo(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length < 5) {
      return { 'correoInvalido': true };
    }
    return null;
  }
  actualizarUsuario() {
    console.log('Usuario agregado exitosamente', this.usuarioForm.value);
    const usuarioFormulario = this.usuarioForm.value;
    this.usuario = {
      ...usuarioFormulario,
      idUsuario: this.idUsuario
    };
    this.usuarioService.actualizarUsuario(this.idUsuario, this.usuario).subscribe(
      (res: any) => {
        console.log(`Usuario con ID ${this.idUsuario} actualizado`);
        this.router.navigate(['/listar-usuarios']);
      },
      (err: any) => {
        console.log(`Error al actualizar usuario: ${err.message}`);
      }
    );
    this.detectarCambios();
    this.hayCambios = false;
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  onPaisSelected() {
    const paisId = this.usuarioForm.value.idPais;
    this.usuarioForm.get('idProvincia')?.setValue('');
    this.usuarioForm.get('idProvincia')?.enable();
    this.usuarioForm.get('idLocalidad')?.setValue('');
    this.usuarioForm.get('idLocalidad')?.disable();

    this.provincias = [];

    if (paisId) {
      this.ubicacionService.obtenerProvinciaPorId(paisId).subscribe((data: any[]) => {
        this.provincias = data;
        this.usuarioForm.get('idLocalidad')?.disable();
      });
    }
  }

  onProvinciaSelected() {
    const provinciaId = this.usuarioForm.value.idProvincia;
    this.usuarioForm.get('idLocalidad')?.setValue('');
    this.usuarioForm.get('idLocalidad')?.disable();
    this.localidades = [];

    if (provinciaId) {
      this.ubicacionService.obtenerLocalidadPorId(provinciaId).subscribe((data: any[]) => {
        this.localidades = data;
        this.usuarioForm.get('idLocalidad')?.enable();
      });
    }
  }
  detectarCambios(): void {
    this.hayCambios = !this.sonDatosIguales();
  }

  sonDatosIguales(): boolean {
    // Obtener los valores actuales del formulario
    const formularioActual = this.usuarioForm.value;
    //console.log('formularioActual:', JSON.stringify(this.usuarioForm.value));
    //console.log('usuarioOriginal:', JSON.stringify(this.usuarioOriginal));
    // Comparar los valores actuales con los valores originales
    return JSON.stringify(formularioActual) === JSON.stringify(this.usuarioOriginal);
  }


}
